import * as vscode from "vscode";

export class ProjectListProvider implements vscode.TreeDataProvider<Project> {
  constructor(private projectFolder: string | undefined) {}
  getTreeItem(element: Project): vscode.TreeItem {
    return element;
  }
  getChildren(element?: Project): Thenable<Project[]> {
    if (!element) {
      return Promise.resolve([
        new Project("Add Project", vscode.TreeItemCollapsibleState.None, "add"),
        new Project("List", vscode.TreeItemCollapsibleState.Collapsed, "folder"),
      ]);
    } else {
      return Promise.resolve([]);
    }
  }
}

export class Project extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState?: vscode.TreeItemCollapsibleState,
    public readonly icon?: string
  ) {
    super(label, collapsibleState ? collapsibleState : vscode.TreeItemCollapsibleState.None);
    this.iconPath = new vscode.ThemeIcon(icon ? icon : "project");
    // this.description = "description";
    // this.tooltip = "tooltip";
  }
}
