import React, { useState } from 'react';
import { useOctalysis } from '@/app/contexts/OctalysisContext';
import { Rnd } from 'react-rnd';
import Editor from './Editor';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import {ListItemNode, ListNode} from '@lexical/list';
import PlaygroundEditorTheme from './FloatingTextFormatToolbarPlugin/utils/PlaygroundEditorTheme';

const StickyNote: React.FC<{ cd: string }> = ({ cd }) => {
  const { data } = useOctalysis();
  const [paragraph, setParagraph] = useState(data[cd].coreDriveDescription.paragraph);
  const [isEditing, setIsEditing] = useState(false);
  const [pos, setPos] = useState({ x: data[cd].coreDriveDescription.xPos, y: data[cd].coreDriveDescription.yPos });
  const [size, setSize] = useState({
    width: data[cd].coreDriveDescription.width,
    height: data[cd].coreDriveDescription.height,
  });

  const handleResize = (e: any, direction: any, ref: any, delta: any, position: any) => {
    setSize({
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    });
  };

  const editorConfig = {
    namespace: 'Octalysis Editor',
    editorState: paragraph,
    nodes: [ListNode, ListItemNode],
    onError: (error: any) => {
      console.error(error);
    },
    theme: PlaygroundEditorTheme
  };
  
  return (
    <Rnd
      position={{ x: pos.x, y: pos.y }}
      onDragStop={(e, d) => {
        setPos({ x: d.x, y: d.y });
      }}
      size={{ width: size.width, height: size.height }}
      onResizeStop={handleResize}
      disableDragging={isEditing}
      enableResizing={!isEditing}
      style={{ backgroundColor: 'rgba(202, 240, 248, 0.67)', padding: '1%' }}
    >
      <LexicalComposer initialConfig={editorConfig}>
        <Editor cd={cd} onEditingChange={setIsEditing}></Editor>
      </LexicalComposer>
    </Rnd>
  );
};

export default StickyNote;
