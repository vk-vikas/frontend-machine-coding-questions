import { useState } from "react";
import Folder from "./components/Folder";
import "./App.css";
import explorer from "./data/folderData";
import useTraverseTree from "./hooks/UseTraverseTree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    // item here is the name of the folder or file
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}
