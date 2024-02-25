import * as vscode from "vscode";
import * as fs from "fs";
import { defaultProjectFolderPath } from "../extension";
import { integer } from "vscode-languageclient";
import { exit } from "process";

export class ProjectListProvider implements vscode.TreeDataProvider<Project> {
  constructor() {}
  getTreeItem(element: Project): vscode.TreeItem {
    return element;
  }
  getChildren(element?: Project): Thenable<Project[]> {
    if (!element) {
      return Promise.resolve(this.root);
    } else if (element.label === "List") {
      return Promise.resolve(getProjects());
    } else {
      return Promise.resolve([]);
    }
  }
  private _onDidChangeTreeData: vscode.EventEmitter<Project | undefined | null | void> =
    new vscode.EventEmitter<Project | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Project | undefined | null | void> =
    this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
  private root = [
    new Project("Create new Project", vscode.TreeItemCollapsibleState.None, "add"),
    new Project("Import Addon Folder", vscode.TreeItemCollapsibleState.None, "file-symlink-directory"),
    new Project("List", vscode.TreeItemCollapsibleState.Collapsed, "folder"),
  ];
}

class Project extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState?: vscode.TreeItemCollapsibleState,
    public readonly icon?: string
  ) {
    super(label, collapsibleState ? collapsibleState : vscode.TreeItemCollapsibleState.None);
    this.iconPath = new vscode.ThemeIcon(icon ? icon : "project");
  }
}

function getProjects(): Project[] {
  let projectFolderPath = vscode.workspace
    .getConfiguration()
    .get("bedrock-miner.projectFolderPath") as string;
  projectFolderPath =
    projectFolderPath === "" ? defaultProjectFolderPath + "\\projects" : projectFolderPath + "\\projects";
  const folders = fs.readdirSync(projectFolderPath);

  const projectFiles = folders
    .map((folder) => ({
      folder,
      projectJsonPath: projectFolderPath + "\\" + folder + "\\project.json",
      mtime: fs.statSync(projectFolderPath + "\\" + folder).mtime.getTime(),
    }))
    .filter(({ projectJsonPath }) => fs.existsSync(projectJsonPath))
    .sort((a, b) => b.mtime - a.mtime);

  let projectcount = 0;
  const projects: Project[] = [];
  for (const { projectJsonPath } of projectFiles) {
    try {
      const data = JSON.parse(fs.readFileSync(projectJsonPath, "utf8")) as ProjectJson;
      const newProject = new Project(data.name, vscode.TreeItemCollapsibleState.None, "folder");
      newProject.description = data.description;
      projects.push(newProject);
      projectcount++;
      if (projectcount === 10) {
        break;
      }
    } catch (error) {}
  }

  return projects;
}

interface ProjectJson {
  name: string;
  description: string;
  version: [integer, integer, integer];
  author: [string];
}
