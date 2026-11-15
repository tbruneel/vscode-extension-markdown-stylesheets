# Markdown Stylesheets

Centers VS Code's Markdown Preview and exported `.htmd` documents at a comfortable reading width with scrollable tables, blockquotes, and code blocks with a copy-to-clipboard button, and lets you switch preview and export themes from the Command Palette.

## Why It Exists

By default, VS Code's Markdown Preview expands prose edge-to-edge across wide monitors, clips or wraps wide tables and blockquotes, lacks a copy button on fenced code blocks, and forces you to edit raw CSS file paths in settings whenever you want a fixed GitHub or VS Code theme.

Once installed, **Markdown Stylesheets** gives every preview and exported `.htmd` file a centered reading column, horizontally scrollable tables, blockquotes, and code blocks, and one-click code copy buttons while following whatever VS Code color theme is active, plus a two-keystroke theme switcher.

## Themes

| Theme | Description |
| :--- | :--- |
| `"auto"` *(default)* | Follows your active VS Code color theme while keeping the centered layout. |
| `"vscode-light2026"` | VS Code Light 2026 palette with crisp dark text on a white page. |
| `"vscode-dark2026"` | VS Code Dark 2026 palette tuned for low-glare reading. |
| `"github-light"` | GitHub Light styling matching how Markdown renders on GitHub in light mode. |
| `"github-dark"` | GitHub Dark styling matching how Markdown renders on GitHub in dark mode. |

Selecting any theme updates both VS Code's live Markdown Preview and `.htmd` documents exported with [Markdown HTMD Exports](https://github.com/tbruneel/vscode-extension-markdown-htmd-exports), while keeping any extra custom stylesheets you already configured intact.

## Usage

Centered layout, scrollable blocks, and code copy buttons activate automatically when you install the extension. To switch color themes, press `Ctrl+Shift+P` and run **Markdown Stylesheets: Select Theme**, or set `"markdown-stylesheets.theme"` directly in VS Code Settings.

## Companion Projects

Each extension in this suite handles one responsibility and works on its own, except **Markdown HTMD Exports for Antigravity** which builds on **Markdown HTMD Exports**. Both VS Code's built-in Markdown Preview and **Markdown HTMD Exports** follow your active VS Code color theme and custom Markdown stylesheets out of the box, and automatically pick up **Markdown Alerts** and **Markdown Stylesheets** whenever they are installed.

| Extension | What It Provides | Works With |
| :--- | :--- | :--- |
| **[Markdown Alerts](https://github.com/tbruneel/vscode-extension-markdown-alerts)** | GitHub Alert callout parsing and styling (`[!NOTE]` through `[!CAUTION]`). | Standalone in Markdown Preview; picked up automatically by **Markdown HTMD Exports**. |
| **[Markdown Stylesheets](https://github.com/tbruneel/vscode-extension-markdown-stylesheets)** *(this repo)* | Centered reading width, scrollable tables and blockquotes, code copy buttons, and switchable GitHub / VS Code themes. | Standalone in Markdown Preview; picked up automatically by **Markdown HTMD Exports**. |
| **[Markdown HTMD Exports](https://github.com/tbruneel/vscode-extension-markdown-htmd-exports)** | Self-contained `.htmd` export, auto-refresh on save, built-in VS Code `.htmd` viewer, and Windows browser association. | Standalone (uses active VS Code theme and custom stylesheets); adopts **Markdown Alerts** and **Markdown Stylesheets** if installed. |
| **[Markdown HTMD Exports for Antigravity](https://github.com/tbruneel/vscode-extension-markdown-htmd-exports-antigravity)** | Antigravity agent hook and CLI skill that keep `.htmd` files synced when agents edit `.md` files on disk. | Requires **Markdown HTMD Exports** (installed automatically) and inherits your full VS Code setup. |

## Documentation

- [Technical Documentation](./docs/technical.md) — Stylesheet injection, global settings reconciliation, theme CSS reference, and packaging.
