import React from "react";
import { useFileExplorer } from "./hooks/useFileExplorer";
import Node from "./components/FileExplorer";

const initialTree = {
  id: "root",
  name: "root",
  isFolder: true,
  children: [
    {
      id: 1,
      name: "src",
      isFolder: true,
      children: [{ id: 2, name: "index.js", isFolder: false, children: [] }],
    },
    {
      id: 3,
      name: "package.json",
      isFolder: false,
      children: [],
    },
  ],
};

export default function App() {
  const { tree, insertNode, renameNode, deleteNode } =
    useFileExplorer(initialTree);

  return (
    <div>
      <h2>File Explorer</h2>
      <Node
        node={tree}
        insertNode={insertNode}
        renameNode={renameNode}
        deleteNode={deleteNode}
      />
    </div>
  );
}
