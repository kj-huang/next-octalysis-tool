import { LexicalComposer } from '@lexical/react/LexicalComposer';
import {ListItemNode, ListNode} from '@lexical/list';
import { useOctalysis } from '@/app/contexts/OctalysisContext';
import { useState } from 'react';
import PlaygroundEditorTheme from '../StickyNote/FloatingTextFormatToolbarPlugin/utils/PlaygroundEditorTheme';
import Editor from '../StickyNote/Editor';


const MobileEditor: React.FC<{ cd: string }> = ({ cd }) => {
    const { data } = useOctalysis();
    const [paragraph] = useState(data[cd].coreDriveDescription.paragraph);
    
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
        <LexicalComposer initialConfig={editorConfig}>
            <Editor cd={cd} onEditingChange={()=>{}}></Editor>
        </LexicalComposer>
    )
}


export default MobileEditor;
