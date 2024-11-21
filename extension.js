const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
  let disposable = vscode.commands.registerCommand('nextjs-webview-extension.showWebview', function () {
    const panel = vscode.window.createWebviewPanel(
      'nextjsWebview',
      'Next.js Webview',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'webview-ui', 'dist'))],
      }
    );

    const getHtmlForPath = (filePath) => {
      const htmlPath = path.join(context.extensionPath, 'webview-ui', 'dist', filePath);
      if (!fs.existsSync(htmlPath)) {
        return `<h1>404 - Page Not Found</h1>`;
      }
      let html = fs.readFileSync(htmlPath, 'utf8');

      // Update paths in the HTML to work with the webview
      return html.replace(/(href|src)="([^"]*)"/g, (match, p1, p2) => {
        const resourcePath = vscode.Uri.file(path.join(context.extensionPath, 'webview-ui', 'dist', p2));
        const webviewUri = panel.webview.asWebviewUri(resourcePath);
        return `${p1}="${webviewUri}"`;
      });
    };

    // Load the initial page (index.html)
    panel.webview.html = getHtmlForPath('index.html');

    // Listen for messages from the webview
    panel.webview.onDidReceiveMessage(
      (message) => {
        if (message.command === 'navigate') {
          // Handle navigation by loading a new HTML file
          panel.webview.html = getHtmlForPath(message.path);
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
