// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { workspace } from 'vscode';

const N = "note.turnOn";

const config = workspace.getConfiguration();

const source:Record<string, unknown> = {};

// @ts-ignore
source.workbench = config.inspect("workbench.editorAssociations").workspaceValue;

// @ts-ignore
source.md = config.inspect("vscode-md.options.mode").workspaceValue;

const turnOff = async () => {
	console.log( "turnoff",source.md);
	// @ts-ignore
	// config.update("workbench.editorAssociations", source.workbench);
	// config.update("vscode-md.options.mode", source.md);
};

const turnOn = () => {
	// @ts-ignore
	const v = config.inspect("vscode-md.options.mode").workspaceValue||{};
	// @ts-ignore
	v["*.md"]="myEdit.markdown";
	config.update("workbench.editorAssociations", v);
	config.update("vscode-md.options.mode", "ir");
};

const noteModeSwitch = async () => {
	const config = workspace.getConfiguration();

	if (!config.has(N)) { return; }

	const isOpen = config.get(N);

	isOpen ? turnOn() : turnOff().catch(e=>{console.log(e);});
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
