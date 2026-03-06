import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import folderData from "./data/folderData";
import useTransverseHook from "./hooks/useTransverseHook";

function App() {
  const [explorerData, setExplorerData] = useState(folderData);
  const { insertNode } = useTransverseHook();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <>
      <Folder handleTreeNode={handleInsertNode} explorer={explorerData} />
    </>
  );
}

export default App;
