import styles from './Node.module.css';
import { useCallback, useState } from 'react';
import { type NodeProps, type Node, NodeResizer, Handle, Position } from '@xyflow/react';

export type fNode = Node<
  {
    functionName?: string;
  },
  'functionName'
>;

export default function FunctionNode(props: NodeProps<fNode>) {
  const [functionName, setFunctionName] = useState(props.data?.functionName ?? 'Function Name');
  const [isResizerActive, setIsResizerActive] = useState(false);

  const onChange = useCallback((evt: any) => {
    setFunctionName(evt.target.value);
  }, []);

  const onNodeClick = useCallback(() => {
    setIsResizerActive((prev) => !prev);
  }, []);

  return (
    <div className={`${styles['node']} ${styles['function-node']}`}>
      {/* Enable NodeResizer based on isResizerActive state */}
      {isResizerActive && <NodeResizer minWidth={100} minHeight={30} />}
      
      <Handle type="target" position={Position.Left} />
      <div onClick={onNodeClick}>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          value={functionName}
        />
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
