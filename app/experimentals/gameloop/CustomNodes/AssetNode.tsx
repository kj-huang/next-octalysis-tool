import styles from './Node.module.css';
import { useCallback, useState, useRef } from 'react';
import { type NodeProps, type Node, NodeResizer, Handle, Position, useConnection } from '@xyflow/react';

export type fNode = Node<
  {
    functionName?: string;
  },
  'functionName'
>;

function AssetNode(props: NodeProps<fNode>) {
  const [functionName, setFunctionName] = useState(props.data?.functionName ?? 'Asset Name');
  const [isResizerActive, setIsResizerActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  

  const connection = useConnection();
  const isTarget = connection.inProgress && connection.fromNode.id !== props.id;

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
    <div className={`${styles['node']} ${styles['asset-node']}`}>
      {isResizerActive && <NodeResizer minWidth={100} minHeight={30} />}

      {!connection.inProgress && (
        <Handle
          type="source"
          position={Position.Right}
        />
      )}
      {(!connection.inProgress || isTarget) && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectableStart={false}
        />
      )}

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
    </div>
  );
}

export { AssetNode };
