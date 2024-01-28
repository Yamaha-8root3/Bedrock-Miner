import * as vscode from "vscode";

export async function openFolder(): Promise<void> {
  return new Promise((resolve, reject) => {
    const folder = vscode.window.showOpenDialog({
      title: "Open Addon Folder",
      canSelectFiles: false,
      canSelectFolders: true,
      defaultUri: vscode.Uri.file(
        "C:\\Users\\%USERNAME%\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang"
      ),
    });
    resolve();
  });
}
