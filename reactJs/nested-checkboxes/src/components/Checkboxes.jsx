import React from "react";

const Checkboxes = ({ rootNodes, data, checked, setChecked }) => {
  const handleChange = (e, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: e.target.checked };
      // if children present check them too
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = e.target.checked;
          updateChildren(child);
        });
      };
      updateChildren(node);

      const verifyChecked = (node) => {
        /* this will not work because if potato is unchecked it sees that it has no children and it
        returns false that will shortcircuit the .every() and the check will not go to the children of tomato*/
        if (!node.children) return newState[node.id] || false;
        const areAllChildrenChecked = node.children.every((child) =>
          verifyChecked(child)
        );
        newState[node.id] = areAllChildrenChecked;
        return areAllChildrenChecked;

        /*** right way is not use every() that approach has bugs ***/
        // if (!node.children || node.children.length === 0) {
        //   // if no children, return the current state
        //   return newState[node.id] || false;
        // }
        // // an Array as map returns us an array of booleans
        // const areAllChildrenChecked = node.children?.map((child) =>
        //   verifyChecked(child)
        // );
        // const areAllChecked = areAllChildrenChecked?.every(Boolean);
        // newState[node.id] = areAllChecked;
        // return areAllChecked;
      };
      rootNodes.forEach((rootNode) => {
        verifyChecked(rootNode);
      });
      return newState;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div key={node.id} className="node">
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e, node)}
          />
          <span>{node.name}</span>
          {node.children && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
              rootNodes={rootNodes}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Checkboxes;
