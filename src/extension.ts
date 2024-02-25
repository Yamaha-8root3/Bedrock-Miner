import * as vscode from "vscode";
import * as os from "os";
import { checkProjectFolder } from "./modules/checkProjectFolder";
//?treeView
import { ProjectListProvider } from "./trees/projectList";
//?commands
export const username = os.userInfo().username;
export const defaultProjectFolderPath = "C:\\Users\\" + username + "\\Documents\\Bedrock Miner";
export async function activate(context: vscode.ExtensionContext) {
  console.log("Bedrock Miner > Start Activating...");

  let subscriptions: vscode.Disposable[] = [];
  const projectListProvider = new ProjectListProvider();
  subscriptions.push(vscode.window.registerTreeDataProvider("bm-menu-projects", projectListProvider));
  subscriptions.push(
    vscode.commands.registerCommand("bm.refleshProjects", () => {
      projectListProvider.refresh();
    })
  );

  context.subscriptions.push(...subscriptions);

  checkProjectFolder();
  console.log("Bedrock Miner > Activated");
}

export function deactivate() {}
