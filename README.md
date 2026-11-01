# VS Code Markdown Stylesheets (`tbruneel/vscode-markdown-stylesheets`)

A declarative, CSS-only VS Code extension that:
1. Applies a **GitHub-compatible `1012px` fixed-width layout and self-contained table scrollbars** (`markdown-preview-layout.css`) to VS Code's built-in Markdown Preview automatically.
2. Provides **whitelisted, standalone CSS themes** (`VS Code Light/Dark 2026` and `GitHub Light/Dark`) inside `~/.vscode/extensions/tbruneel.markdown-stylesheets-1.0.0/` so they can be selected directly via VS Code's native **`"markdown.styles"`** setting for **both** the built-in Markdown Preview and [`.md.html` exports (`tbruneel/vscode-markdown-html`)](https://github.com/tbruneel/vscode-markdown-html).

---

## Included Stylesheets

| Stylesheet | Purpose / Target Theme | Background | Text |
| :--- | :--- | :---: | :---: |
| `markdown-preview-layout.css` | **Built-in Preview Layout** *(loaded automatically via `"markdown.previewStyles"`)* | *(Inherits active VS Code theme)* | *(Inherits active VS Code theme)* |
| `markdown-vscode-light2026.css` | **VS Code Light 2026** (`2026-light.json`) | `#FFFFFF` | `#202020` |
| `markdown-vscode-dark2026.css` | **VS Code Dark 2026** (`2026-dark.json`) | `#121314` | `#BBBEBF` |
| `markdown-github-light.css` | **GitHub Light Default** (`@primer/css`) | `#FFFFFF` | `#1F2328` |
| `markdown-github-dark.css` | **GitHub Dark Default** (`@primer/css`) | `#0D1117` | `#F0F6FC` |

---

## How It Works

### 1. Why This Repo Is Packaged as a Declarative CSS Extension
By default, VS Code's built-in Markdown Preview runs in a sandboxed Webview whose `localResourceRoots` only allows loading local `.css` files from:
1. The currently open workspace folder, or
2. Installed extension directories (`~/.vscode/extensions/*`) that contribute `"markdown.previewStyles"`.

Because `package.json` in this repository contributes `"markdown.previewStyles": ["./markdown-preview-layout.css"]`:
- Every VS Code Markdown Preview automatically gets the `1012px` centered container (`948px` inner content width) and GitHub-style table overflow (`max-width: 100%; overflow: auto`).
- VS Code automatically adds the `tbruneel.markdown-stylesheets-1.0.0` extension folder to `localResourceRoots`, allowing you to point VS Code's native **`"markdown.styles"`** setting at any of the four full theme stylesheets without triggering Webview security errors.

### 2. Origin of the Theme Stylesheets
- **VS Code 2026 Stylesheets (`markdown-vscode-*.css`):**
  - Derived from Microsoft Visual Studio Code's built-in `markdown-language-features/media/markdown.css` and `theme-defaults/themes/2026-light.json` & `2026-dark.json`.
  - Embeds `:root` `--vscode-*` variables and applies `.vscode-light` / `.vscode-dark` border rules directly to `th`, `td`, `h1`, `h2`, and `hr` so standalone `.md.html` exports and live previews render identically.
- **GitHub Primer Stylesheets (`markdown-github-*.css`):**
  - Derived from [`sindresorhus/github-markdown-css`](https://github.com/sindresorhus/github-markdown-css) (`@primer/css`), adapted for bare `<body>` templates, `1012px` centered width, and GitHub-style alerts.

---

## Usage in VS Code (`settings.json`)

- **Default (Automatic Theme Matching):**
  - Leave `"markdown.styles"` unset (`[]`). The built-in preview and `tbruneel/vscode-markdown-html` automatically follow your active VS Code Light/Dark theme.
- **Custom Theme Override (via `"markdown.styles"`):**
  - Set `"markdown.styles"` in `settings.json` to switch both the built-in Markdown Preview and `.md.html` exports to a specific stylesheet:

```json
{
    "markdown.styles": [
        "C:\\Users\\Tuur Bruneel\\.vscode\\extensions\\tbruneel.markdown-stylesheets-1.0.0\\markdown-github-light.css"
    ]
}
```
