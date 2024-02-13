import * as vscode from "vscode";
import { registerExtensionCommands } from "./commands";
import { registerExtensionTrees } from "./trees";

export async function activate(context: vscode.ExtensionContext) {
  console.log("Bedrock Miner > Start Activating...");
  Promise.all([registerExtensionCommands(context), registerExtensionTrees()]);
  console.log("Bedrock Miner > Activated");
}

export function deactivate() {}
