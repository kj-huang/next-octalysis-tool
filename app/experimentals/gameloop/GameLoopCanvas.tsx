"use client";

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
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import FunctionNode from './CustomNodes/FunctionNode';

import './page-overview.css';
import Sidebar from './Sidebar';

const initialNodes = [
  { id: '1', type: 'functionNode', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  {
    id: '3',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
    width: 180,
    height: 40,
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
const nodeTypes = { 
  functionNode: FunctionNode
  // assetNode: 
};

function GameLoopCanvas() {
  // const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      </div>

      <Sidebar />
    </div>

  );
}

export {GameLoopCanvas}