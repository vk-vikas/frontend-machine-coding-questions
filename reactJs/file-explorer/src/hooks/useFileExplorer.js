import { useState } from "react";

export function useFileExplorer(initialTree) {
  const [tree, setTree] = useState(initialTree);

  // INSERT
  const insertNode = (folderId, name, isFolder) => {
    const newNode = {
      id: Date.now(),
      name,
      isFolder,
      children: [],
    };

    const insertRecursively = (node) => {
      if (node.id === folderId && node.isFolder) {
        return {
          ...node,
          children: [...node.children, newNode],
        };
      }

      return {
        ...node,
        children: node.children.map(insertRecursively),
      };
    };

    setTree((prev) => insertRecursively(prev));
  };

  // RENAME
  const renameNode = (id, newName) => {
    const renameRecursively = (node) => {
      if (node.id === id) {
        return { ...node, name: newName };
      }

      return {
        ...node,
        children: node.children.map(renameRecursively),
      };
    };

    setTree((prev) => renameRecursively(prev));
  };

  // DELETE
  const deleteNode = (id) => {
    const deleteRecursively = (node) => ({
      ...node,
      children: node.children
        .filter((child) => child.id !== id)
        .map(deleteRecursively),
    });

    setTree((prev) => deleteRecursively(prev));
  };

  return { tree, insertNode, renameNode, deleteNode };
}
