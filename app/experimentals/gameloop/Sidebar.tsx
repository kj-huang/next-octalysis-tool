import React from 'react';

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div
        className="game-element-node function-node"
        onDragStart={(event) => onDragStart(event, 'functionNode')}
        draggable
      >
        Function Node
      </div>
    </aside>
  );
};

export default Sidebar;
