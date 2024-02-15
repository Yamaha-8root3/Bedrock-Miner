import * as vscode from "vscode";
import { ProjectListProvider } from "./trees/projectList";

export async function registerExtensionTrees(): Promise<void> {
  return new Promise(() => {
    vscode.window.registerTreeDataProvider("bm-menu-projects", new ProjectListProvider(undefined));
    console.log("Bedrock Miner > Trees Registered");
  });
}
