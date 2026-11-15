# Markdown Stylesheets

Centers VS Code's Markdown Preview at a comfortable reading width with scrollable wide tables and code blocks, and lets you switch preview and `.htmd` export themes from the Command Palette.

## Why It Exists

By default, VS Code's Markdown Preview expands prose edge-to-edge across wide monitors, wraps or clips wide tables, and forces you to edit raw CSS file paths in settings whenever you want to preview a document in GitHub Light or Dark mode.

Once installed, **Markdown Stylesheets** gives the preview a centered GitHub-width page layout right away while following your active editor colors, and adds a two-keystroke theme switcher that updates both live previews and exported `.htmd` documents.

## Themes

| Theme | Description |
| :--- | :--- |
| `"auto"` *(default)* | Follows your active VS Code color theme while keeping the centered layout. |
| `"vscode-light2026"` | VS Code Light 2026 palette with crisp dark text on a white page. |
| `"vscode-dark2026"` | VS Code Dark 2026 palette tuned for low-glare reading. |
| `"github-light"` | GitHub Light styling matching how Markdown renders on GitHub in light mode. |
| `"github-dark"` | GitHub Dark styling matching how Markdown renders on GitHub in dark mode. |

Selecting any theme updates both VS Code's live Markdown Preview and `.htmd` documents exported with [Markdown HTML](https://github.com/tbruneel/vscode-extension-markdown-html), while keeping any extra custom stylesheets you already configured intact.

## Usage

Layout and table scrolling improvements activate automatically when you install the extension. To switch color themes, press `Ctrl+Shift+P` and run **Markdown Stylesheets: Select Theme**, or set `"markdown-stylesheets.theme"` directly in VS Code Settings.

## Companion Projects

| Repository | Role in Suite |
| :--- | :--- |
| **[`tbruneel/vscode-extension-markdown-stylesheets`](https://github.com/tbruneel/vscode-extension-markdown-stylesheets)** *(this repo)* | Provides a centered preview layout and switchable GitHub and VS Code themes. |
| **[`tbruneel/vscode-extension-markdown-alert`](https://github.com/tbruneel/vscode-extension-markdown-alert)** | Renders GitHub Alert callouts in VS Code's Markdown Preview. |
| **[`tbruneel/vscode-extension-markdown-html`](https://github.com/tbruneel/vscode-extension-markdown-html)** | Exports Markdown files to self-contained `.htmd` documents with an integrated viewer. |
| **[`tbruneel/vscode-extension-markdown-html-antigravity`](https://github.com/tbruneel/vscode-extension-markdown-html-antigravity)** | Automatically refreshes `.htmd` exports when Antigravity agents edit Markdown files. |

## Documentation

- [Technical Documentation](./docs/technical.md) — Stylesheet injection, global settings reconciliation, theme CSS reference, and packaging.
