'use client';

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  BackgroundVariant,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  reconnectEdge,
  type DefaultEdgeOptions,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './page-overview.css';
import Sidebar from './Sidebar';
import { FunctionNode } from './CustomNodes/FunctionNode';
import { AssetNode } from './CustomNodes/AssetNode';
import { ActionNode } from './CustomNodes/ActionNode';
import { StatusNode } from './CustomNodes/StatusNode';
import { SidebarEdgeSelectors } from './SidebarEdgeSelectors';
import { BoosterEdge, EnablesEdge, LeadsToEdge, ObtainsEdge } from './CustomEdges';

// This prop is mandatory!
const defaultEdgeOptions: DefaultEdgeOptions = {
  markerEnd: { type: MarkerType.ArrowClosed, color: "black", width: 20, height: 20 },
};

const initialNodes:any[] = [];

const initialEdges:any[] = [];

const nodeTypes = {
  functionNode: FunctionNode,
  assetNode: AssetNode,
  actionNode: ActionNode,
  statusNode: StatusNode,
};

const edgeTypes = {
  'leads-to': LeadsToEdge,
  'obtains': ObtainsEdge,
  'enables': EnablesEdge,
  'boosters': BoosterEdge
};


function GameLoopCanvas() {
  // const reactFlowWrapper = useRef(null);
  const [selectedEdgeType, setSelectedEdgeType] = useState('leads-to');
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);

  const onConnect = useCallback((connection: any) => {
    const edge = { ...connection, type: selectedEdgeType };
    setEdges((eds) => addEdge(edge, eds))
  }, [setEdges, selectedEdgeType]);

  const handleEdgeTypeChange = (edgeType: string) => {
    setSelectedEdgeType(edgeType);
  };

  const onReconnect = useCallback(
    (oldEdge: any, newConnection: any) => setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  let id = 0;
  const getId = () => `game_node_${id++}`;

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className={`reactflow-wrapper`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onReconnect={onReconnect}
          fitView
          onDrop={onDrop}
          onDragOver={onDragOver}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>

      <Sidebar />

      <SidebarEdgeSelectors onSelectEdgeType={handleEdgeTypeChange} />
    </div>
  );
}

export { GameLoopCanvas };
