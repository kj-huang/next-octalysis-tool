import React from 'react';

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      {/* <div className="description">You can drag these nodes to the pane on the right.</div> */}
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'functionNode')}
        draggable
      >
        Function Node
      </div>
    </aside>
  );
};

export default Sidebar;
