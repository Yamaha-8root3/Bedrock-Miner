import * as vscode from "vscode";
import { openFolder } from "./commands/openfolder";
import { Disposable } from "vscode-languageclient";
export const enum CommandId {
  /** {@link openfolder}*/
  openFolder = "bm.openfolder",
}
export async function registerExtensionCommands(context: vscode.ExtensionContext): Promise<void> {
  let subscriptions: Disposable[] = [];
  return new Promise(() => {
    subscriptions.push(vscode.commands.registerCommand(CommandId.openFolder, openFolder));
    context.subscriptions.push(...subscriptions);
    console.log("Bedrock Miner > Commands Registered");
  });
}
