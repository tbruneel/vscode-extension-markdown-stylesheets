# Markdown Stylesheets

Custom CSS stylesheets for exporting Markdown documents (`.md`) to standalone `.html`, `.pdf`, `.png`, and `.jpeg` files using the [Markdown PDF (`yzane.markdown-pdf`)](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf) VS Code extension while preserving the exact look and feel of VS Code's native built-in Markdown Preview.

---

## Included Stylesheets

### `markdown-vscode-light2026.css`

Standalone export stylesheet matching VS Code's native Markdown Preview under the **Light 2026** color theme.

#### Origin & Source
Derived from Microsoft Visual Studio Code's built-in `markdown-language-features` extension stylesheet:
- **Local VS Code installation path:**
  `C:\Program Files\Microsoft Visual Studio Code\<version>\resources\app\extensions\markdown-language-features\media\markdown.css`
- **Upstream repository:**
  [microsoft/vscode — `extensions/markdown-language-features/media/markdown.css`](https://github.com/microsoft/vscode/blob/main/extensions/markdown-language-features/media/markdown.css)

#### Why This Adaptation Is Needed for `Markdown PDF`
By default, `yzane.markdown-pdf` produces exports that look noticeably different from VS Code's built-in preview for three reasons:
1. **Outdated bundled CSS:** `Markdown PDF` ships a 2018 snapshot of `markdown.css` where headings are non-bold (`font-weight: normal`) and `<h2>` headings lack bottom borders.
2. **Missing `<body class="vscode-light">` in `template.html`:** VS Code's native `markdown.css` scopes table and heading border colors under `.vscode-light` and `.vscode-dark` (e.g., `.vscode-light th`, `.vscode-light td`, `.vscode-light h1`, `.vscode-light h2`). Because `Markdown PDF`'s HTML template uses a bare `<body>` element without those classes, table borders and heading underlines disappear when using the stock stylesheet.
3. **Missing Webview CSS variables & inline-code override:** Inside VS Code, the Webview host injects `--vscode-*` theme variables (`--vscode-editor-foreground`, `--vscode-textPreformat-background`, `--vscode-textBlockQuote-background`, etc.) at runtime, whereas `Markdown PDF`'s default `markdown-pdf.css` overrides inline `<code>` elements to yellow (`#C9AE75`).

`markdown-vscode-light2026.css` resolves all three issues by:
- Embedding VS Code's current `markdown-language-features` layout and typography rules (`font-weight: 600` headings, `<h1>` & `<h2>` underlines, spacing, and table cell padding).
- Defining the **Light 2026** `--vscode-*` CSS custom properties directly in `:root`.
- Applying the `.vscode-light` border colors directly to `th`, `td`, `h1`, `h2`, and `hr` so standalone HTML and PDF exports render identically to the live VS Code preview without requiring special `<body>` classes.

---

## Usage in VS Code (`settings.json`)

Add the following settings to your user `settings.json` (`%APPDATA%\Code\User\settings.json`):

```json
{
    "markdown-pdf.includeDefaultStyles": false,
    "markdown-pdf.styles": [
        "D:\\Development\\markdown-stylesheets\\markdown-vscode-light2026.css"
    ]
}
```
