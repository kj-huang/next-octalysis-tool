import { BaseEdge, getStraightPath } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type EdgeProps = {
    id: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    markerEnd?: string;
};

export function LeadsToEdge({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
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

export function ObtainsEdge({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
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

export function EnablesEdge({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
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

export function BoosterEdge({ id, sourceX, sourceY, targetX, targetY}: EdgeProps) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
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