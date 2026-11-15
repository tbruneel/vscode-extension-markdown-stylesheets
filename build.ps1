<#
.SYNOPSIS
    Validates syntax and packages this VS Code extension into a Marketplace-ready .vsix archive under build\.
.PARAMETER Install
    Installs the built .vsix package into Microsoft VS Code after packaging.
#>
[CmdletBinding()]
param(
    [switch]$Install
)

$ErrorActionPreference = 'Stop'

$repoRoot     = $PSScriptRoot
$repoName     = Split-Path -Leaf $repoRoot
$manifestPath = Join-Path $repoRoot 'package.json'
if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) {
    throw "package.json not found in '$repoRoot'."
}

$pkg = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($field in @('name', 'publisher', 'version')) {
    if ([string]::IsNullOrWhiteSpace([string]$pkg.$field)) {
        throw "package.json is missing required '$field' field."
    }
}

if (-not [string]::IsNullOrWhiteSpace([string]$pkg.icon)) {
    $iconRel  = ([string]$pkg.icon) -replace '\\', '/'
    $iconPath = Join-Path $repoRoot ($iconRel -replace '/', '\')
    if (-not (Test-Path -LiteralPath $iconPath -PathType Leaf)) {
        throw "Missing icon file referenced by package.json: '$iconRel'"
    }
}

Push-Location $repoRoot
try {
    foreach ($jsRel in @('src\extension.js', 'scripts\copy-code-button.js')) {
        $jsPath = Join-Path $repoRoot $jsRel
        if (Test-Path -LiteralPath $jsPath -PathType Leaf) {
            node -c $jsPath
            if ($LASTEXITCODE -ne 0) { throw "node syntax check failed for '$jsRel'." }
        }
    }

    $buildDir = Join-Path $repoRoot 'build'
    if (-not (Test-Path -LiteralPath $buildDir -PathType Container)) {
        New-Item -Path $buildDir -ItemType Directory -Force | Out-Null
    }

    $vsixPath = Join-Path $buildDir "$repoName-v$($pkg.version).vsix"
    if (Test-Path -LiteralPath $vsixPath -PathType Leaf) {
        Remove-Item -LiteralPath $vsixPath -Force
    }

    npx @vscode/vsce package --no-dependencies -o $vsixPath
    if ($LASTEXITCODE -ne 0) { throw "vsce package failed with exit code $LASTEXITCODE." }

    Write-Host "[BUILD] Packaged VS Code Marketplace archive: $vsixPath" -ForegroundColor Green

    if ($Install) {
        code --install-extension $vsixPath --force
        if ($LASTEXITCODE -ne 0) { throw "code --install-extension failed with exit code $LASTEXITCODE." }
        Write-Host "[BUILD] Installed extension into Microsoft VS Code: $($pkg.publisher).$($pkg.name) v$($pkg.version)" -ForegroundColor Cyan
    }
} finally {
    Pop-Location
}
