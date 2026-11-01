# VS Code Markdown Stylesheets (`tbruneel/vscode-markdown-stylesheets`)

A lightweight VS Code extension that:
1. Applies a **GitHub-compatible `902px` fixed-width layout and self-contained table scrollbars** (`markdown-preview-layout.css`) to VS Code's built-in Markdown Preview automatically.
2. Provides **whitelisted, standalone CSS themes** (`VS Code Light/Dark 2026` and `GitHub Light/Dark`) and a **`"markdown-stylesheets.theme"`** setting (plus the **Markdown Stylesheets: Select Theme** command) that automatically resolves and updates VS Code's native **`"markdown.styles"`** setting for **both** the built-in Markdown Preview and [`.md.html` exports (`tbruneel/vscode-markdown-html`)](https://github.com/tbruneel/vscode-markdown-html).

---

## Included Stylesheets

| Theme ID (`markdown-stylesheets.theme`) | Stylesheet | Target Theme | Background | Text |
| :--- | :--- | :--- | :---: | :---: |
| `"auto"` *(default)* | `markdown-preview-layout.css` | **Follows Active VS Code Theme** | *(Active theme)* | *(Active theme)* |
| `"vscode-light2026"` | `markdown-vscode-light2026.css` | **VS Code Light 2026** (`2026-light.json`) | `#FFFFFF` | `#202020` |
| `"vscode-dark2026"` | `markdown-vscode-dark2026.css` | **VS Code Dark 2026** (`2026-dark.json`) | `#121314` | `#BBBEBF` |
| `"github-light"` | `markdown-github-light.css` | **GitHub Light Default** (`@primer/css`) | `#FFFFFF` | `#1F2328` |
| `"github-dark"` | `markdown-github-dark.css` | **GitHub Dark Default** (`@primer/css`) | `#0D1117` | `#F0F6FC` |

---

## How It Works

### 1. Whitelisting & Automatic `"markdown.styles"` Management
By default, VS Code's built-in Markdown Preview runs in a sandboxed Webview whose `localResourceRoots` only allows loading local `.css` files from:
1. The currently open workspace folder, or
2. Installed extension directories (`~/.vscode/extensions/*`) that contribute `"markdown.previewStyles"`.

Because `package.json` in this repository contributes `"markdown.previewStyles": ["./markdown-preview-layout.css"]`:
- Every VS Code Markdown Preview automatically gets the `902px` centered container (`838px` inner content width) and GitHub-style table overflow (`max-width: 100%; overflow: auto`).
- VS Code automatically adds the `tbruneel.markdown-stylesheets-1.0.0` extension folder to `localResourceRoots`.
- When you change **`"markdown-stylesheets.theme"`** (or run **Markdown Stylesheets: Select Theme** from the Command Palette), `extension.js` resolves its own installation path on the current machine and updates `"markdown.styles"` automatically—so you never have to type or hardcode full file paths.

### 2. Origin of the Theme Stylesheets
- **VS Code 2026 Stylesheets (`markdown-vscode-*.css`):**
  - Derived from Microsoft Visual Studio Code's built-in `markdown-language-features/media/markdown.css` and `theme-defaults/themes/2026-light.json` & `2026-dark.json`.
  - Embeds `:root` `--vscode-*` variables and applies `.vscode-light` / `.vscode-dark` border rules directly to `th`, `td`, `h1`, `h2`, and `hr` so standalone `.md.html` exports and live previews render identically.
- **GitHub Primer Stylesheets (`markdown-github-*.css`):**
  - Derived from [`sindresorhus/github-markdown-css`](https://github.com/sindresorhus/github-markdown-css) (`@primer/css`), adapted for bare `<body>` templates, `902px` centered width, and GitHub-style alerts.

---

## Usage in VS Code

You can switch themes at any time either via the Command Palette (**`Markdown Stylesheets: Select Theme`**) or in `settings.json`:

```jsonc
{
    "markdown-stylesheets.theme": "auto" // Options: "auto", "vscode-light2026", "vscode-dark2026", "github-light", "github-dark"
}
```
