import styles from './Editor.module.css';
import React from 'react';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import ToolbarPlugin from './ToolBarPlugin';
import { useOctalysis } from '@/app/contexts/OctalysisContext';

const Editor = ({ cd }: { cd: string;}) => {
  const [editor] = useLexicalComposerContext();
  const { updateCoreDriveDescription } = useOctalysis();
 
  const handleSave = () => {
      editor.update(async () => {
        const editorState = editor.getEditorState();
        const json = JSON.stringify(editorState.toJSON());
        updateCoreDriveDescription(cd, json);
      });
  };

  return (
    <div>
          <div className={styles['editor-container']}>
          <ToolbarPlugin />
            <RichTextPlugin
              contentEditable={
                <div className={styles['editor']}>
                  <ContentEditable onBlur={handleSave} />
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
              placeholder={null}
            />
            <HistoryPlugin />
          </div>
    </div>
  );
};

export default Editor;
