const vscode = require('vscode');
const path = require('path');

const THEME_FILES = {
  'vscode-light2026': 'markdown-vscode-light2026.css',
  'vscode-dark2026': 'markdown-vscode-dark2026.css',
  'github-light': 'markdown-github-light.css',
  'github-dark': 'markdown-github-dark.css',
};

async function syncMarkdownStyles(extensionPath) {
  const theme = vscode.workspace.getConfiguration('markdown-stylesheets').get('theme', 'auto');
  const mdConfig = vscode.workspace.getConfiguration('markdown');
  const currentStyles = mdConfig.get('styles', []);

  const normalizedExtDir = path.normalize(extensionPath).toLowerCase();
  const otherStyles = Array.isArray(currentStyles)
    ? currentStyles.filter(
        (s) => typeof s === 'string' && !path.normalize(s).toLowerCase().startsWith(normalizedExtDir),
      )
    : [];

  if (theme === 'auto' || !THEME_FILES[theme]) {
    if (Array.isArray(currentStyles) && otherStyles.length !== currentStyles.length) {
      await mdConfig.update(
        'styles',
        otherStyles.length > 0 ? otherStyles : undefined,
        vscode.ConfigurationTarget.Global,
      );
    }
    return;
  }

  const targetCssPath = path.join(extensionPath, THEME_FILES[theme]);
  const nextStyles = [...otherStyles, targetCssPath];
  const unchanged =
    Array.isArray(currentStyles) &&
    currentStyles.length === nextStyles.length &&
    currentStyles.every((v, i) => v === nextStyles[i]);

  if (!unchanged) {
    await mdConfig.update('styles', nextStyles, vscode.ConfigurationTarget.Global);
  }
}

function activate(context) {
  syncMarkdownStyles(context.extensionPath);

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('markdown-stylesheets.theme')) {
        syncMarkdownStyles(context.extensionPath);
      }
    }),
    vscode.commands.registerCommand('markdown-stylesheets.selectTheme', async () => {
      const current = vscode.workspace.getConfiguration('markdown-stylesheets').get('theme', 'auto');
      const items = [
        {
          label: 'auto',
          description: 'Follow active VS Code color theme (Default)',
          picked: current === 'auto',
        },
        {
          label: 'vscode-light2026',
          description: 'VS Code Light 2026 (#FFFFFF / #202020)',
          picked: current === 'vscode-light2026',
        },
        {
          label: 'vscode-dark2026',
          description: 'VS Code Dark 2026 (#121314 / #BBBEBF)',
          picked: current === 'vscode-dark2026',
        },
        {
          label: 'github-light',
          description: 'GitHub Light Default (#FFFFFF / #1F2328)',
          picked: current === 'github-light',
        },
        {
          label: 'github-dark',
          description: 'GitHub Dark Default (#0D1117 / #F0F6FC)',
          picked: current === 'github-dark',
        },
      ];
      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select Markdown Preview & Export Theme',
      });
      if (selected) {
        await vscode.workspace
          .getConfiguration('markdown-stylesheets')
          .update('theme', selected.label, vscode.ConfigurationTarget.Global);
      }
    }),
  );
}

function deactivate() {}

module.exports = { activate, deactivate };

