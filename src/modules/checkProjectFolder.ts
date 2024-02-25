import * as vscode from "vscode";
import * as fs from "fs";

import { defaultProjectFolderPath, username } from "../extension";
export function checkProjectFolder(): void {
  let folderpath = String(vscode.workspace.getConfiguration().get("bedrock-miner.projectFolderPath"));
  if (folderpath === "") {
    if (!fs.existsSync(defaultProjectFolderPath)) {
      fs.mkdirSync(defaultProjectFolderPath);
    }
    makeInternalDirectory(defaultProjectFolderPath);
  } else {
    if (!fs.existsSync(folderpath)) {
      promptUserToSetProjectFolder();
    } else {
      makeInternalDirectory(folderpath);
    }
  }
}

function promptUserToSetProjectFolder() {
  vscode.window
    .showInformationMessage(
      "Project Folder doesn't exist. Please set the correct Project Folder or use the default",
      "Set Project Folder",
      "Use Default"
    )
    .then((result) => {
      handleUserPromptResult(result);
    });
}

function handleUserPromptResult(result: string | undefined) {
  if (result === "Set Project Folder") {
    vscode.window
      .showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        title: "Set Project Folder",
      })
      .then((folder) => {
        if (folder) {
          vscode.workspace
            .getConfiguration()
            .update("bedrock-miner.projectFolderPath", folder[0].fsPath, true);
          makeInternalDirectory(folder[0].fsPath);
        }
      });
  } else if (result === "Use Default") {
    vscode.workspace.getConfiguration().update("bedrock-miner.projectFolderPath", "", true);
    if (!fs.existsSync(defaultProjectFolderPath)) {
      fs.mkdirSync(defaultProjectFolderPath);
    }
    makeInternalDirectory(defaultProjectFolderPath);
  }
}

function makeInternalDirectory(folderpath: string) {
  fs.mkdirSync(folderpath + "\\projects", { recursive: true });
}
