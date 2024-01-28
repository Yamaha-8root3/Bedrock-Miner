import * as vscode from "vscode";
import { registerExtensionCommands } from "./commands";

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(...(await registerExtensionCommands()));
  console.log("Bedrock Miner > Activated");
}

export function deactivate() {}
