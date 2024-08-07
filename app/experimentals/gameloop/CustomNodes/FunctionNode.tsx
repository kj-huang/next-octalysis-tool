import styles from './Node.module.css';
import { useCallback, useState, useRef, useEffect } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onTextChange = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFunctionName(evt.target.value);
  }, []);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setIsResizerActive(true); // Enable resizer on double-click
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setIsResizerActive(false); // Disable resizer after editing is done
  };

  return (
    <div className={`${styles['node']} ${styles['function-node']}`}>
      {isResizerActive && <NodeResizer minWidth={100} minHeight={30} />}
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={functionName}
          onChange={onTextChange}
          onBlur={handleBlur}
          className={`${styles['textarea']}`}
          style={{ width: '100%', minHeight: '30px', padding: '8px' }}
        />
      ) : (
        <p
          onDoubleClick={handleDoubleClick}
          className={`${styles['paragraph']} ${styles['nodrag']}`}
          style={{ cursor: 'text', margin: 0 }}
        >
          {functionName}
        </p>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
