# Markdown Stylesheets

Custom CSS stylesheets for exporting Markdown documents (`.md`) to standalone `.html`, `.pdf`, `.png`, and `.jpeg` files using the [Markdown PDF (`yzane.markdown-pdf`)](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf) VS Code extension while preserving the exact look and feel of VS Code's native built-in Markdown Preview.

---

## Included Stylesheets

| Stylesheet | Target VS Code Theme | Background | Text |
| :--- | :--- | :---: | :---: |
| `markdown-vscode-light2026.css` | **Light 2026** (`2026-light.json`) | `#FFFFFF` | `#202020` |
| `markdown-vscode-dark2026.css` | **Dark 2026** (`2026-dark.json`) | `#121314` | `#BBBEBF` |

---

## Origin & Source

Derived directly from Microsoft Visual Studio Code's built-in `markdown-language-features` and `theme-defaults` extensions:
- **Layout & Typography (`markdown.css`):**
  - Local path: `C:\Program Files\Microsoft Visual Studio Code\<version>\resources\app\extensions\markdown-language-features\media\markdown.css`
  - Upstream: [microsoft/vscode — `extensions/markdown-language-features/media/markdown.css`](https://github.com/microsoft/vscode/blob/main/extensions/markdown-language-features/media/markdown.css)
- **Theme Color Tokens (`2026-light.json` & `2026-dark.json`):**
  - Local path: `C:\Program Files\Microsoft Visual Studio Code\<version>\resources\app\extensions\theme-defaults\themes\2026-light.json` (and `2026-dark.json`)

### Why This Adaptation Is Needed for `Markdown PDF`
By default, `yzane.markdown-pdf` produces exports that look noticeably different from VS Code's built-in preview for three reasons:
1. **Outdated bundled CSS:** `Markdown PDF` ships a 2018 snapshot of `markdown.css` where headings are non-bold (`font-weight: normal`) and `<h2>` headings lack bottom borders.
2. **Missing `<body class="vscode-light / vscode-dark">` in `template.html`:** VS Code's native `markdown.css` scopes table and heading border colors under `.vscode-light` and `.vscode-dark` (e.g., `.vscode-light th`, `.vscode-light td`, `.vscode-light h1`, `.vscode-light h2`). Because `Markdown PDF`'s HTML template uses a bare `<body>` element without those classes, table borders and heading underlines disappear when using the stock stylesheet.
3. **Missing Webview CSS variables & inline-code override:** Inside VS Code, the Webview host injects `--vscode-*` theme variables (`--vscode-editor-foreground`, `--vscode-textPreformat-background`, `--vscode-textBlockQuote-background`, etc.) at runtime, whereas `Markdown PDF`'s default `markdown-pdf.css` overrides inline `<code>` elements to yellow (`#C9AE75`).

These stylesheets resolve all three issues by:
- Embedding VS Code's current `markdown-language-features` layout and typography rules (`font-weight: 600` headings, `<h1>` & `<h2>` underlines, spacing, and table cell padding).
- Defining the exact **Light 2026** or **Dark 2026** `--vscode-*` CSS custom properties directly in `:root`.
- Applying the `.vscode-light` / `.vscode-dark` border colors directly to `th`, `td`, `h1`, `h2`, and `hr` so standalone HTML and PDF exports render identically to the live VS Code preview without requiring special `<body>` classes.
- **Centered Fixed-Width Screen Layout (`width: 1060px`):** Centers `body` at a constant `1060px` width on screen (`width: auto` in `@media print`) so standalone `.html` files look clean on ultrawide monitors and scroll horizontally as a single intact page when the viewport is narrower than `1060px`.
- **GitHub-Style Markdown Alerts (`.markdown-alert-*`):** Includes GitHub Primer Light & Dark alert styles (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`) with compact `6px` title spacing (`margin-bottom: 6px`), matching [`tbruneel/vscode-markdown-alert`](https://github.com/tbruneel/vscode-markdown-alert) and [`tbruneel/vscode-markdown-pdf`](https://github.com/tbruneel/vscode-markdown-pdf).

---

## Usage in VS Code (`settings.json`)

Add the following settings to your user `settings.json` (`%APPDATA%\Code\User\settings.json`), choosing either `markdown-vscode-light2026.css` or `markdown-vscode-dark2026.css`:

```json
{
    "markdown-pdf.includeDefaultStyles": false,
    "markdown-pdf.styles": [
        "D:\\Development\\vscode-markdown-stylesheets\\markdown-vscode-light2026.css"
    ]
}
```
