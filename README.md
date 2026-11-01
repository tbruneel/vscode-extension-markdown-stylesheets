# VS Code Markdown Stylesheets

## Key Takeaways

> [!IMPORTANT]
> - **GitHub-Aligned Markdown Layout:** Gives VS Code's Markdown Preview a fixed-width centered layout, scrollable tables, and scrollable blockquotes out of the box.
> - **Selectable Stylesheet Themes:** Switch between `"auto"`, `"vscode-light2026"`, `"vscode-dark2026"`, `"github-light"`, and `"github-dark"` via the Command Palette or `settings.json`.
> - **Companion Extensions:** Works alongside [`vscode-markdown-alert`](https://github.com/tbruneel/vscode-markdown-alert) and [`vscode-markdown-html`](https://github.com/tbruneel/vscode-markdown-html).

## Selecting a Theme

Installing the extension immediately applies the fixed-width centered layout while following your active VS Code color theme (`"auto"`). You can switch themes at any time using either of the following methods:

| Method | Action |
| :--- | :--- |
| **Command Palette** | Press `Ctrl+Shift+P` → Click **`Markdown Stylesheets: Select Theme`** → Pick a theme. |
| **Settings File** | In `settings.json`, set `"markdown-stylesheets.theme"` to one of the options listed below. |

## Available Themes

| Theme | Bundled Stylesheet | Background | Body Text | Description |
| :--- | :--- | :---: | :---: | :--- |
| `"auto"` *(default)* | `markdown-preview-layout.css` | *(VS Code)* | *(VS Code)* | Uses VS Code's default colors while applying the fixed-width centered layout. |
| `"vscode-light2026"` | `markdown-vscode-light2026.css` | `#FFFFFF` | `#202020` | VS Code Light 2026 stylesheet with GitHub Alert colors. |
| `"vscode-dark2026"` | `markdown-vscode-dark2026.css` | `#121314` | `#BBBEBF` | VS Code Dark 2026 stylesheet with GitHub Alert colors. |
| `"github-light"` | `markdown-github-light.css` | `#FFFFFF` | `#1F2328` | GitHub Light stylesheet with GitHub syntax highlighting and GitHub Alert colors. |
| `"github-dark"` | `markdown-github-dark.css` | `#0D1117` | `#F0F6FC` | GitHub Dark stylesheet with GitHub syntax highlighting and GitHub Alert colors. |

- **Default `"auto"` Mode:** Leaves `"markdown.styles"` untouched so the preview follows whatever default colors VS Code is set to, while `markdown-preview-layout.css` applies the fixed-width layout, table scrollbars, and blockquote styling.
- **Explicit Theme Overrides:** Selecting a specific theme automatically resolves the bundled `.css` path on disk and updates VS Code's `"markdown.styles"` setting (while preserving any unrelated custom stylesheets), applying that theme to both VS Code's Markdown Preview and new `.md.html` exports.

## Companion Extensions

This repository is part of a three-extension setup:

| Extension Repository | Role in the VS Code Markdown Suite |
| :--- | :--- |
| **[`tbruneel/vscode-markdown-stylesheets`](https://github.com/tbruneel/vscode-markdown-stylesheets)** *(this repo)* | Provides custom Markdown stylesheet themes that align with GitHub styling (such as a fixed-width centered layout, and blockquotes with horizontal scrollbars and a copy-to-clipboard button). |
| **[`tbruneel/vscode-markdown-alert`](https://github.com/tbruneel/vscode-markdown-alert)** | Provides support for GitHub Alert callouts in VS Code's live Markdown Preview, with support for automatic theme detection and Markdown stylesheet theme overrides. |
| **[`tbruneel/vscode-markdown-html`](https://github.com/tbruneel/vscode-markdown-html)** | Exports Markdown files (`.md`) to self-contained Markdown files (`.md.html`) which are automatically opened by VS Code's built-in web browser. |

## Building & Packaging from Source

```powershell
# No compile or bundle step is required (pure JavaScript and CSS)

# Package into a local .vsix archive
npx @vscode/vsce package --no-dependencies
```
