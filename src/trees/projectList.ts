import * as vscode from "vscode";

export class ProjectListProvider implements vscode.TreeDataProvider<ProjectListElement> {
  private rootElements: ProjectListElement[];
  constructor() {
    this.rootElements = this.createElements();
  }
  getTreeItem(element: ProjectListElement): vscode.TreeItem {
    const collapsibleState =
      element.children.length > 0
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None;
    return new vscode.TreeItem(element.name, collapsibleState);
  }

  getChildren(element?: ProjectListElement): vscode.ProviderResult<ProjectListElement[]> {
    return element ? element.children : this.rootElements;
  }

  createElements(): ProjectListElement[] {
    const projects = new ProjectListElement("Projects");
    projects.addChild(new ProjectListElement("test"));
    return [projects];
  }
}

export class ProjectListElement {
  private _children: ProjectListElement[];
  private _parent: ProjectListElement | undefined | null;
  constructor(public name: string) {
    this._children = [];
  }
  get parent(): ProjectListElement | undefined | null {
    return this._parent;
  }

  get children(): ProjectListElement[] {
    return this._children;
  }

  addChild(child: ProjectListElement) {
    child.parent?.removeChild(child);
    this._children.push(child);
    child._parent = this;
  }

  removeChild(child: ProjectListElement) {
    const childIndex = this._children.indexOf(child);
    if (childIndex >= 0) {
      this._children.splice(childIndex, 1);
      child._parent = null;
    }
  }
}
