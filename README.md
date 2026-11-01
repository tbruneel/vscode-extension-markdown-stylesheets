# VS Code Markdown Stylesheets (`tbruneel/vscode-markdown-stylesheets`)

## Key Takeaways

> [!IMPORTANT]
> **How this extension standardizes Markdown layout and theming across VS Code:**
> - **Automatic `902px` GitHub Layout (`markdown-preview-layout.css`):** Contributes a declarative preview stylesheet that gives every VS Code Markdown Preview a centered `902px` container (`838px` inner content width with `32px` padding), self-contained horizontal scrollbars on wide tables, and a `48px` right gutter in code blocks for the copy button.
> - **Five Selectable Theme Modes (`markdown-stylesheets.theme`):** Switch seamlessly between `"auto"` *(follows your active VS Code color theme)*, `"vscode-light2026"`, `"vscode-dark2026"`, `"github-light"`, and `"github-dark"` via the Command Palette or `settings.json`.
> - **Zero Hardcoded File Paths & Instant Sync:** Automatically resolves its own installation directory on the current machine and updates VS Code's native `"markdown.styles"` setting—applying your chosen theme to **both** the built-in Markdown Preview and [`.md.html` exports (`tbruneel/vscode-markdown-html`)](https://github.com/tbruneel/vscode-markdown-html).

## 1. Quick Start Guide

**Zero configuration is required out of the box.** Installing the extension immediately applies the `902px` GitHub layout while following your active VS Code color theme (`"auto"`).

### Option A — Switch Themes via the Command Palette

1. Open the Command Palette (`Ctrl+Shift+P` or `F1`).
2. Run **`Markdown Stylesheets: Select Theme`**.
3. Choose a theme from the quick-pick menu:
   ```text
   auto              Follow active VS Code color theme (Default)
   vscode-light2026  VS Code Light 2026 (#FFFFFF / #202020)
   vscode-dark2026   VS Code Dark 2026 (#121314 / #BBBEBF)
   github-light      GitHub Light Default (#FFFFFF / #1F2328)
   github-dark       GitHub Dark Default (#0D1117 / #F0F6FC)
   ```
4. Any open Markdown Preview and any open `.md.html` file in the workspace update automatically.

### Option B — Configure in `settings.json`

Set `"markdown-stylesheets.theme"` in your User or Workspace `settings.json` (for example, to force GitHub Light in both Markdown Previews and `.md.html` exports):

```json
{
    "markdown-stylesheets.theme": "github-light"
}
```

## 2. Included Themes & Configuration Reference

### 2.1 Available Theme Modes (`markdown-stylesheets.theme`)

| Theme ID | Bundled Stylesheet | Target Palette | Background | Body Text | Description |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `"auto"` *(default)* | `markdown-preview-layout.css` | **Active VS Code Theme** | *(Theme)* | *(Theme)* | Uses VS Code's active color theme while applying the `902px` layout and table/code-block rules. |
| `"vscode-light2026"` | `markdown-vscode-light2026.css` | **VS Code Light 2026** | `#FFFFFF` | `#202020` | Standalone VS Code `2026-light.json` theme with `:root` `--vscode-*` variables and GitHub Alerts. |
| `"vscode-dark2026"` | `markdown-vscode-dark2026.css` | **VS Code Dark 2026** | `#121314` | `#BBBEBF` | Standalone VS Code `2026-dark.json` theme with `:root` `--vscode-*` variables and GitHub Alerts. |
| `"github-light"` | `markdown-github-light.css` | **GitHub Light Default** | `#FFFFFF` | `#1F2328` | Official GitHub Primer Light stylesheet (`@primer/css`) with PrettyLights syntax highlighting. |
| `"github-dark"` | `markdown-github-dark.css` | **GitHub Dark Default** | `#0D1117` | `#F0F6FC` | Official GitHub Primer Dark stylesheet (`@primer/css`) with PrettyLights syntax highlighting. |

### 2.2 Commands & Settings Reference

| Identifier | Kind | Description |
| :--- | :--- | :--- |
| `Markdown Stylesheets: Select Theme`<br>(`markdown-stylesheets.selectTheme`) | Command | Opens an interactive quick-pick menu to switch `"markdown-stylesheets.theme"` globally. |
| `"markdown-stylesheets.theme"` | Setting | Selects one of `"auto"`, `"vscode-light2026"`, `"vscode-dark2026"`, `"github-light"`, or `"github-dark"`. |
| `"markdown.styles"` | Managed Setting | Automatically updated by `extension.js` with the absolute path to the selected theme stylesheet (or cleared when set to `"auto"`), while preserving any custom non-extension entries. |

## 3. Companion Extensions Ecosystem

This extension works together with two companion extensions to provide a unified authoring, previewing, and exporting workflow:

| Extension Repository | Role in the VS Code Markdown Suite |
| :--- | :--- |
| **[`tbruneel/vscode-markdown-stylesheets`](https://github.com/tbruneel/vscode-markdown-stylesheets)** *(this repo)* | Contributes `markdown-preview-layout.css` to `"markdown.previewStyles"`, whitelists the theme stylesheets in VS Code's Webview sandbox, and syncs `"markdown.styles"` from `"markdown-stylesheets.theme"`. |
| **[`tbruneel/vscode-markdown-html`](https://github.com/tbruneel/vscode-markdown-html)** | Reads `"markdown.styles"` to inline your active theme directly into self-contained `.md.html` files, re-exports open documents automatically when you switch themes, and provides a built-in `*.md.html` viewer. |
| **[`tbruneel/vscode-markdown-alert`](https://github.com/tbruneel/vscode-markdown-alert)** | Renders GitHub-style blockquote alerts (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`) in VS Code's live Markdown Preview and Notebooks. |

## 4. Technical Overview: How the Extension Works

### 4.1 Solving VS Code's Webview `localResourceRoots` Sandbox

By default, VS Code's built-in Markdown Preview runs inside a sandboxed Webview whose Content Security Policy and `localResourceRoots` restrict which local `.css` files can be loaded via `"markdown.styles"`:

| Stylesheet Location | Allowed by VS Code `"markdown.styles"`? | Why It Matters |
| :--- | :--- | :--- |
| **Arbitrary User Path**<br>*(e.g. `C:\Users\<name>\styles\custom.css`)* | **Blocked** *(outside workspace)* | VS Code refuses to load local files outside the open workspace folder unless their parent directory is registered in `localResourceRoots`. |
| **Extension Contributing `"markdown.previewStyles"`**<br>(`~/.vscode/extensions/tbruneel.markdown-stylesheets-1.0.0/`) | **Always Whitelisted** | Contributing `"markdown.previewStyles": ["./markdown-preview-layout.css"]` in [`package.json`](package.json) causes VS Code to add the entire extension folder to `localResourceRoots` across all workspaces and single-file windows. |

When you change `"markdown-stylesheets.theme"`, [`extension.js`](extension.js) resolves `context.extensionPath` on the current machine and writes the full path of the chosen `.css` file into `"markdown.styles"` automatically—without touching any unrelated custom stylesheets you may have configured.

### 4.2 End-to-End Theme Synchronization Architecture

```text
+-------------------------------------------------------------------------------+
| User Action: Command Palette ("Select Theme") or settings.json                |
|  -> Sets "markdown-stylesheets.theme" (e.g. "github-light")                   |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| vscode-markdown-stylesheets (extension.js)                                    |
|  1. Contributes "markdown.previewStyles": ["./markdown-preview-layout.css"]   |
|     (whitelists extension directory in VS Code Webview localResourceRoots)    |
|  2. Resolves <extensionPath>/markdown-github-light.css                        |
|  3. Updates global "markdown.styles" (or clears it when theme == "auto")      |
+-------------------+---------------------------------------+-------------------+
                    |                                       |
                    v                                       v
+---------------------------------------+   +-----------------------------------+
| Built-In VS Code Markdown Preview     |   | vscode-markdown-html              |
|  • Always loads 902px layout CSS      |   |  • Inlines "markdown.styles" CSS  |
|  • Loads active theme CSS from        |   |    directly into <file>.md.html   |
|    whitelisted "markdown.styles" path |   |  • Auto-re-exports open .md files |
+---------------------------------------+   +-----------------------------------+
```

### 4.3 Stylesheet Engineering & Specificity Overrides

To ensure that live VS Code Markdown Previews and standalone `.md.html` exports render identically to GitHub.com, the stylesheets implement several targeted engineering rules:

| Area | Technical Implementation |
| :--- | :--- |
| **`902px` Container (`838px` Content Width)** | • Sets `body { width: 902px; margin: 0 auto; padding: 32px; box-sizing: border-box; }` so text lines, tables, and code blocks match GitHub's `838px` inner README column.<br>• Resets `body { width: auto; padding: 1em 26px 0; }` inside `@media print` for clean PDF/print pagination.<br>• Sets `table { display: block; width: max-content; max-width: 100%; overflow: auto; }` so wide tables scroll horizontally inside the column without stretching the page. |
| **VS Code Webview Specificity Overrides** | • VS Code's Markdown Preview injects internal `_defaultStyles` with class-qualified selectors such as `.vscode-dark code`, `.vscode-dark blockquote`, and `.vscode-dark .hljs-keyword` (specificity `(0,1,1)`), which beat bare `body code` or `body .hljs-keyword` rules (`(0,0,2)` / `(0,1,1)`).<br>• All theme stylesheets duplicate critical color and token selectors under `body.vscode-light` and `body.vscode-dark` (specificity `(0,2,1)`), ensuring a Light theme stays 100% Light even when VS Code itself is running a Dark editor theme (and vice versa). |
| **Code Block `48px` Copy-Button Gutter** | • Applies `padding: 0 48px 0 0; position: relative; overflow: visible;` to `pre, pre.hljs, pre:not(.hljs)` and moves the `16px` padding and horizontal scrollbar (`overflow: auto`) onto the inner `code` / `code > div` element.<br>• Reserves a dedicated `48px` right-hand gutter for the `32x32` copy-to-clipboard button so code text never collides with the button, while `overflow: visible` on `pre` allows the `"Copy code to clipboard"` / `"Copied!"` hover tooltip to render cleanly. |
| **GitHub PrettyLights Syntax Fidelity** | • Maps `highlight.js` (`.hljs-*`) classes to official GitHub Primer Light & Dark PrettyLights colors.<br>• Distinguishes JSON property keys (`#116329` in Light / `#7ee787` in Dark) from string values (`#0a3069` in Light / `#a5d6ff` in Dark).<br>• Matches GitHub's strict JSON grammar by highlighting `//` comments inside ` ```json ` blocks as invalid tokens (`#d1242f` on `#ffebe9` in Light; `#f85149` in Dark) while keeping comments neutral gray inside ` ```jsonc ` and ` ```json5 ` blocks. |
