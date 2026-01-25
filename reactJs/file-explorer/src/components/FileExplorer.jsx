import React, { useState } from "react";

export default function Node({ node, insertNode, renameNode, deleteNode }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(node.name);

  return (
    <div style={{ marginLeft: 20 }}>
      <div>
        {node.isFolder && (
          <button onClick={() => setExpanded((e) => !e)}>
            {expanded ? "-" : "+"}
          </button>
        )}

        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              renameNode(node.id, name);
              setEditing(false);
            }}
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            style={{ padding: "0 10px" }}
          >
            {node.isFolder ? "📁" : "📄"} {node.name}
          </span>
        )}
        {node.isFolder && (
          <>
            <button
              onClick={() => {
                const name = prompt("Enter file name");
                if (name) insertNode(node.id, name, false);
              }}
            >
              +File
            </button>

            <button
              onClick={() => {
                const name = prompt("Enter folder name");
                if (name) insertNode(node.id, name, true);
              }}
            >
              +Folder
            </button>
          </>
        )}

        {node.id !== "root" && (
          <button onClick={() => deleteNode(node.id)}>❌</button>
        )}
      </div>

      {expanded &&
        node.children.map((child) => (
          <Node
            key={child.id}
            node={child}
            insertNode={insertNode}
            renameNode={renameNode}
            deleteNode={deleteNode}
          />
        ))}
    </div>
  );
}
