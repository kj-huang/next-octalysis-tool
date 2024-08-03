import styles from './Editor.module.css';
import React, { useState, useEffect } from 'react';
import { useOctalysis } from '@/app/contexts/OctalysisContext';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import FloatingTextFormatToolbarPlugin from './FloatingTextFormatToolbarPlugin';
import {ListItemNode, ListNode} from '@lexical/list';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import PlaygroundEditorTheme from './FloatingTextFormatToolbarPlugin/utils/PlaygroundEditorTheme';
import SaveBtn from './SaveButton';

const Editor = ({ cd, onEditingChange }: { cd: string; onEditingChange: (isEditing: boolean) => void }) => {
  const { data } = useOctalysis();
  const [paragraph, setParagraph] = useState(data[cd].coreDriveDescription.paragraph);
  const [isEditing, setIsEditing] = useState(false);
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    setParagraph(data[cd].coreDriveDescription.paragraph);
  }, [cd, data]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    onEditingChange(true);
  };
  const handleSave = () => {
    setIsEditing(false);
    onEditingChange(false);
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
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <LexicalComposer initialConfig={editorConfig}>
          <div className={styles['editor-container']}>
            <RichTextPlugin
              contentEditable={
                <div className={styles['editor']} ref={onRef}>
                  <ContentEditable />
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
              placeholder={null}
            />
            <FloatingTextFormatToolbarPlugin
              anchorElem={floatingAnchorElem as HTMLElement}
              setIsLinkEditMode={() => {}}
            />
            <HistoryPlugin />
          </div>

          <SaveBtn cd={cd} toggleEdit={handleSave} />
        </LexicalComposer>
      ): (
        <div className={styles['editor']}>
          <div dangerouslySetInnerHTML={{ __html: paragraph }} />
        </div>
      )}

    </div>
  );
};

export default Editor;
