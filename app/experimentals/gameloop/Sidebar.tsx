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

      <div
        className="game-element-node asset-node"
        onDragStart={(event) => onDragStart(event, 'assetNode')}
        draggable
      >
        Asset Node
      </div>

      <div
        className="game-element-node action-node"
        onDragStart={(event) => onDragStart(event, 'actionNode')}
        draggable
      >
        Action Node
      </div>

      <div
        className="game-element-node status-node"
        onDragStart={(event) => onDragStart(event, 'statusNode')}
        draggable
      >
        Status Node
      </div>
    </aside>
  );
};

export default Sidebar;
