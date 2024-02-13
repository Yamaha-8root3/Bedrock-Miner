import * as vscode from "vscode";
import { ProjectListProvider } from "./trees/projectList";

export async function registerExtensionTrees(): Promise<void> {
  return new Promise(() => {
    vscode.window.registerTreeDataProvider("bm-menu-projects", new ProjectListProvider());
    console.log("Bedrock Miner > Trees Registered");
  });
}
