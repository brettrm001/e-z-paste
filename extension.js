const vscode = require('vscode');
const path = require('path')
const axios = require('axios')

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	// Configuration
	const config = vscode.workspace.getConfiguration('e-z-paste');
	// UI Element
	var alignment;

	if (config.get('side') === 'left') alignment = vscode.StatusBarAlignment.Left
	else alignment = vscode.StatusBarAlignment.Right
	if (config.get('side') !== 'disabled') {
		const button = vscode.window.createStatusBarItem(alignment, 9999);
		button.text = 'E-Z Paste';
		button.tooltip = 'Upload selected content or full file to E-Z Paste';
		button.command = 'e-z-paste.createPaste';
		button.show();
	}

	let disposable = vscode.commands.registerCommand('e-z-paste.createPaste', async function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const apiKey = config.get('apiKey')
			const description = config.get('description') || 'Visual Studio Code'
			var text;
			if (!editor.selection.isEmpty) text = editor.document.getText(editor.selection)
			else text = editor.document.getText()

			if (text.length < 1) return vscode.window.showErrorMessage("You cannot paste an empty file!")
			if (description.length < 1) return vscode.window.showErrorMessage("Custom description must be at least 1 character")
			if (!apiKey || apiKey === 'your-api-key') return vscode.window.showErrorMessage('Set your E-Z Api key first')

			axios.request({
				method: 'POST',
				url: 'https://api.e-z.host/paste',
				headers: {
					'Content-Type': 'application/json',
					key: apiKey
				},
				data: { text, language: editor.document.languageId, title: editor.document.isUntitled ? 'Untitled' : path.basename(editor.document.fileName), description }
			}).then((d) => {
				vscode.window.showInformationMessage(`E-Z Paste created successfully (${editor.selection.isEmpty ? 'Entire Document' : 'Selected Content'}). Link has been copied to your clipboard.`, ...["Open Link", "Open Deletion Link"])
					.then((selection) => {
						if (selection === 'Open Deletion Link') vscode.env.openExternal(d.data.deletionUrl)
						else if (selection === 'Open Link') vscode.env.openExternal(d.data.pasteUrl)
					})
				vscode.env.clipboard.writeText(d.data.pasteUrl)
			}).catch(e => {
				vscode.window.showErrorMessage(`${e}`)
			})
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
