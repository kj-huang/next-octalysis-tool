import styles from './Editor.module.css';
import React, { useState, useEffect } from 'react';
import { useOctalysis } from '@/app/contexts/OctalysisContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import FloatingTextFormatToolbarPlugin from './FloatingTextFormatToolbarPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import SaveBtn from './SaveButton';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const Editor = ({ cd, onEditingChange }: { cd: string; onEditingChange: (isEditing: boolean) => void }) => {
  const { data } = useOctalysis();
  const [editor] = useLexicalComposerContext();
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
    editor.setEditable(true);
  };
  const handleSave = () => {
    setIsEditing(false);
    onEditingChange(false);
  };

  

  return (
    <div onDoubleClick={handleDoubleClick}>
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

          {isEditing && (<SaveBtn cd={cd} toggleEdit={handleSave} />)}
    </div>
  );
};

export default Editor;
