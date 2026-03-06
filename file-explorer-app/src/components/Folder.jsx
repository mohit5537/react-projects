import { useState } from "react";

const Folder = ({ handleTreeNode, explorer }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFile = (e, file) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: file,
    });
  };

  const onAddFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleTreeNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: "4px" }}>
        <div style={{ display: "flex" }} onClick={() => setExpand(!expand)}>
          <span>📂{explorer.name}</span>
          <div style={{ marginLeft: "10px" }}>
            <button onClick={(e) => handleNewFile(e, true)}>➕ 📁</button>
            <button onClick={(e) => handleNewFile(e, false)}>➕ 📃</button>
          </div>
        </div>
        {showInput.visible && (
          <div className="inputContainer">
            <span>{showInput.isFolder ? "📁" : "📄"}</span>
            <input
              type="text"
              autoFocus
              onKeyDown={onAddFolder}
              onBlur={() => setShowInput({ ...showInput, visible: false })}
            />
          </div>
        )}
        {explorer.items.map((exp) => {
          return (
            <div
              style={{
                display: expand ? "block" : "none",
                paddingLeft: "15px",
              }}
              key={exp.id}
            >
              <Folder
                handleTreeNode={handleTreeNode}
                explorer={exp}
                key={exp.id}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <span>📄 {explorer.name}</span>
      </div>
    );
  }
};

export default Folder;
