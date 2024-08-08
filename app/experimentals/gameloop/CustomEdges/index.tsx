import { BaseEdge, getStraightPath, useInternalNode } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { getEdgeParams } from '../utlis';

type EdgeProps = {
    id: string;
    source: string;
    target: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    markerEnd?: string;
};

export function LeadsToEdge({ id,source, target }: EdgeProps) {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);
  
    if (!sourceNode || !targetNode) {
      return null;
    }
  
    const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  
    const [edgePath] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    });
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ strokeWidth: 2, stroke: 'blue' }}
        markerEnd={"url(#1__color=black&height=20&type=arrowclosed&width=20)"}
      />
    </>
  );
}

export function ObtainsEdge({ id, source, target }: EdgeProps) {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);
  
    if (!sourceNode || !targetNode) {
      return null;
    }
  
    const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  
    const [edgePath] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ strokeWidth: 2, stroke: 'red' }}
        markerEnd={"url(#1__color=black&height=20&type=arrowclosed&width=20)"}
      />
    </>
  );
}

export function EnablesEdge({ id, source, target }: EdgeProps) {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);
  
    if (!sourceNode || !targetNode) {
      return null;
    }
  
    const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  
    const [edgePath] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ strokeWidth: 2,  stroke: 'orange' }}
        markerEnd={"url(#1__color=black&height=20&type=arrowclosed&width=20)"}
      />
    </>
  );
}

export function BoosterEdge({ id, source, target }: EdgeProps) {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);
  
    if (!sourceNode || !targetNode) {
      return null;
    }
  
    const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  
    const [edgePath] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    });
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={"url(#1__color=black&height=20&type=arrowclosed&width=20)"}
        style={{ strokeWidth: 2, stroke: 'green' }}
        label={'booster'}
      />
    </>
  );
}