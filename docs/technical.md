# Technical Documentation — Markdown Stylesheets

This engineering reference covers the dual stylesheet and preview-script injection model, non-destructive global `"markdown.styles"` reconciliation, contributed command/setting surface, and packaging rules across [`source/extension.js`](../source/extension.js), [`source/copy-code-button.js`](../source/copy-code-button.js), [`package.json`](../package.json), and `styles/*.css`.

## 1. Architecture & Repository Layout

```text
vscode-extension-markdown-stylesheets/
├── .gitignore                        # Ignores *.htmd, node_modules/, build/, package/, *.vsix, .DS_Store
├── .vscodeignore                     # Excludes build.ps1, package/, readme.md, **/*.vsix, package-lock.json, docs/, .agents/, *.htmd
├── assets/
│   └── icon.png                      # 256x256 Marketplace extension icon
├── build.ps1                         # Validates JS syntax and packages package\<repo>-v<ver>.vsix
├── license.md                        # MIT license
├── package.json                      # Manifest declaring previewStyles, previewScripts, selectTheme & theme setting
├── readme.md                         # User-facing overview, theme table & usage
├── docs/
│   └── technical.md                  # Stylesheet reconciliation internals & asset reference
├── source/
│   ├── copy-code-button.js           # Code block copy-to-clipboard button injector for previews and .htmd
│   └── extension.js                  # syncMarkdownStyles reconciler & QuickPick command handler
└── styles/
    ├── markdown-preview-layout.css   # Always-active 902px centered container, scrollable blocks & copy buttons
    ├── markdown-vscode-light2026.css # VS Code Light 2026 stylesheet
    ├── markdown-vscode-dark2026.css  # VS Code Dark 2026 stylesheet
    ├── markdown-github-light.css     # GitHub Light Default stylesheet
    └── markdown-github-dark.css      # GitHub Dark Default stylesheet
```

```mermaid
flowchart LR
    Preview["VS Code Markdown Preview"] -->|"contributes.markdown.previewStyles"| Layout["styles/markdown-preview-layout.css"]
    Preview -->|"contributes.markdown.previewScripts"| CopyScript["source/copy-code-button.js"]
    Command["markdown-stylesheets.selectTheme"] -->|"Update setting (Global)"| Setting["markdown-stylesheets.theme"]
    Setting -->|"onDidChangeConfiguration / onStartupFinished"| Sync["syncMarkdownStyles() in source/extension.js"]
    Sync -->|"Resolve path or clear managed entry"| MdStyles["Global markdown.styles Setting"]
    Layout -->|"Resolved dynamically in auto mode"| MdHtmd["vscode-extension-markdown-htmd-exports"]
    CopyScript -->|"Inlined dynamically during export"| MdHtmd
    MdStyles -->|"Loaded by preview & exported offline"| MdHtmd
```

## 2. Dual Injection, Settings Reconciliation & Suite Interoperability

[`package.json`](../package.json) separates structural layout and code-copy behavior from explicit color themes across three VS Code contribution channels so the exact same styling applies identically to both VS Code's built-in Markdown Preview and [vscode-extension-markdown-htmd-exports](https://github.com/tbruneel/vscode-extension-markdown-htmd-exports) exports (including headless runs via [vscode-extension-markdown-htmd-exports-antigravity](https://github.com/tbruneel/vscode-extension-markdown-htmd-exports-antigravity)). [`styles/markdown-preview-layout.css`](../styles/markdown-preview-layout.css) loads automatically through `"contributes.markdown.previewStyles"`, constraining the preview body to a centered `902px` reading column (`32px` padding, reset cleanly inside `@media print`), adding horizontal scrollbars to wide tables (`max-width: 100%; overflow: auto`) and blockquotes (`overflow-x: auto` with `--vscode-textBlockQuote-*` surface tokens), spacing and padding `<pre>` code blocks cleanly across any active VS Code theme, and styling `.code-block-copy-button` triggers and tooltips. [`source/copy-code-button.js`](../source/copy-code-button.js) loads via `"contributes.markdown.previewScripts"`, attaching copy-to-clipboard buttons on initial load and whenever VS Code dispatches `vscode.markdown.updateContent`, while stopping `dblclick` propagation so rapid clicks do not switch the preview back to the source editor. At export time, `Markdown HTMD Exports` reads this extension's `markdown.previewStyles` and `markdown.previewScripts` dynamically and inlines both into standalone `.htmd` files alongside any active stylesheet from `"markdown.styles"`. Consequently, the centered layout, scrollable blocks, and copy buttons stay active in `"auto"` mode regardless of which VS Code color theme is active, and named presets override `--color-*` tokens on `.markdown-alert` when [vscode-extension-markdown-alerts](https://github.com/tbruneel/vscode-extension-markdown-alerts) is installed.

When a named preset is active, [`syncMarkdownStyles`](../source/extension.js#L11-L47) maps `"markdown-stylesheets.theme"` through `THEME_FILES` and updates the user's global `"markdown.styles"` configuration on startup (`onStartupFinished`) and configuration change events. Naively appending or overwriting `"markdown.styles"` would accumulate broken versioned extension paths after updates or wipe custom user CSS files. To prevent both issues, `syncMarkdownStyles` normalizes each existing string entry (`path.normalize(s).toLowerCase()`), filters out any path starting with `extensionPath` or whose basename matches any file in `THEME_FILES`, and preserves everything else in `otherStyles`. In `"auto"` mode, it writes `otherStyles.length > 0 ? otherStyles : undefined` only if managed entries were actually present; in named preset modes, it performs an element-by-element equality check before writing `[...otherStyles, targetCssPath]` to `vscode.ConfigurationTarget.Global`.

## 3. Commands, Settings & Theme Asset Reference

| Contribution ID | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `markdown-stylesheets.selectTheme` | Command | — | Opens a QuickPick marking the active preset (`picked: true`) and writes `markdown-stylesheets.theme` globally. |
| `markdown-stylesheets.theme` | String Enum | `"auto"` | Selects `auto`, `vscode-light2026`, `vscode-dark2026`, `github-light`, or `github-dark`. |

| Theme Key | Bundled Stylesheet | Background | Body Text | Interoperability |
| :--- | :--- | :--- | :--- | :--- |
| `"auto"` | [`styles/markdown-preview-layout.css`](../styles/markdown-preview-layout.css) | *(VS Code)* | *(VS Code)* | Active in all previews via `markdown.previewStyles` alongside [`source/copy-code-button.js`](../source/copy-code-button.js) (`markdown.previewScripts`); clears managed `markdown.styles` entries. |
| `"vscode-light2026"` | [`styles/markdown-vscode-light2026.css`](../styles/markdown-vscode-light2026.css) | `#FFFFFF` | `#202020` | Sets GitHub Alert `--color-*` variables for [vscode-extension-markdown-alerts](https://github.com/tbruneel/vscode-extension-markdown-alerts) and inline export by [vscode-extension-markdown-htmd-exports](https://github.com/tbruneel/vscode-extension-markdown-htmd-exports). |
| `"vscode-dark2026"` | [`styles/markdown-vscode-dark2026.css`](../styles/markdown-vscode-dark2026.css) | `#121314` | `#BBBEBF` | Same alert variable overrides and export styling for dark VS Code 2026 surfaces. |
| `"github-light"` | [`styles/markdown-github-light.css`](../styles/markdown-github-light.css) | `#FFFFFF` | `#1F2328` | GitHub Light syntax highlighting and `--color-*` alert variables. |
| `"github-dark"` | [`styles/markdown-github-dark.css`](../styles/markdown-github-dark.css) | `#0D1117` | `#F0F6FC` | GitHub Dark syntax highlighting and `--color-*` alert variables. |

## 4. Packaging

```powershell
# Validate JavaScript syntax and package package\vscode-extension-markdown-stylesheets-v<version>.vsix
.\build.ps1

# Package and immediately install into Microsoft VS Code
.\build.ps1 -Install

# Equivalent npm wrapper or manual inspection commands
npm run package
npx @vscode/vsce ls --no-dependencies
```

Because [`package.json`](../package.json) sets `"main": "./source/extension.js"` with pure CommonJS JavaScript (`vscode` and `path`), browser preview scripts, and static CSS assets, no compilation step is needed. During packaging, [`build.ps1`](../build.ps1) writes a temporary `package/marketplace-readme.md` passed via `--readme-path package/marketplace-readme.md --githubBranch main` so the Marketplace archive links companion extensions via VS Code Marketplace URLs while leaving [`readme.md`](../readme.md) unchanged on GitHub. [`.gitignore`](../.gitignore) ignores `build/` and `package/`, and [`.vscodeignore`](../.vscodeignore) excludes `package-lock.json`, `.gitignore`, `build.ps1`, `package/**`, `readme.md`, `**/*.vsix`, `**/*.htmd`, `docs/**`, and `.agents/**`, retaining `package.json`, `license.md`, the transformed `readme.md`, `assets/icon.png`, `source/extension.js`, `source/copy-code-button.js`, and `styles/*.css`.
