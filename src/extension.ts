// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { workspace } from 'vscode';

const N = "note.turnOn";

const config = workspace.getConfiguration();

const turnOff = () => {
	const v = config.get("workbench.editorAssociations");
	// @ts-ignore
	v["*.md"]="default";
	config.update("workbench.editorAssociations", v);
	// config.update("vscode-md.options.mode", "ir");
};

const turnOn = () => {

	const v = config.get("workbench.editorAssociations");
	// @ts-ignore
	v["*.md"]="myEdit.markdown";
	config.update("workbench.editorAssociations", v);
	config.update("vscode-md.options.mode", "ir");
};

const noteModeSwitch = () => {
	const config = workspace.getConfiguration();

	if (!config.has(N)) { return; }

	const isOpen = config.get(N);

	isOpen ? turnOn() : turnOff();
};

export function activate(context: vscode.ExtensionContext) {
	// 立即检测下配置
	noteModeSwitch();

	// 监听配置
	workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
		if (!e.affectsConfiguration(N)) { return; }
		noteModeSwitch();
	});

	// 注册命令
	const turnOnCMD = vscode.commands.registerCommand('note-pack.turnOn', () => {
		config.update(N, true);
	});

	const turnOffCMD = vscode.commands.registerCommand('note-pack.turnOff', () => {
		config.update(N, false);
	});

	context.subscriptions.push(turnOnCMD, turnOffCMD);
}

// this method is called when your extension is deactivated
export function deactivate() { }
