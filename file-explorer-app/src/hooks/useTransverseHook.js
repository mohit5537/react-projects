const useTransverseHook = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      return {
        ...tree,
        items: [
          {
            id: Date.now(),
            name: item,
            isFolder,
            items: [],
          },
          ...tree.items,
        ],
      };
    }

    const latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  };
  return { insertNode };
};

export default useTransverseHook;
