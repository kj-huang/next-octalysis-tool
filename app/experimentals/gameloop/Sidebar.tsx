import React from 'react';

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <p>Nodes</p>
      <div
        className="game-element-node function-node"
        onDragStart={(event) => onDragStart(event, 'functionNode')}
        draggable
      >
        Function
      </div>

      <div
        className="game-element-node asset-node"
        onDragStart={(event) => onDragStart(event, 'assetNode')}
        draggable
      >
        Asset
      </div>

      <div
        className="game-element-node action-node"
        onDragStart={(event) => onDragStart(event, 'actionNode')}
        draggable
      >
        Action
      </div>

      <div
        className="game-element-node status-node"
        onDragStart={(event) => onDragStart(event, 'statusNode')}
        draggable
      >
        Status
      </div>

      <div
        className=""
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        T
      </div>
    </aside>
  );
};

export default Sidebar;
