import * as vscode from "vscode";
import { openFolder } from "./commands/openfolder";
import { Disposable } from "vscode-languageclient";
import { resolve } from "path";
export const enum CommandId {
  /** {@link openfolder}*/
  openFolder = "bm.openfolder",
}
export async function registerExtensionCommands(): Promise<Disposable[]> {
  let subscriptions: Disposable[] = [];
  return new Promise((resolve, reject) => {
    subscriptions.push(vscode.commands.registerCommand(CommandId.openFolder, openFolder));
    resolve(subscriptions);
  });
}
