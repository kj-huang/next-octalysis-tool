import { useOctalysis } from "@/app/contexts/OctalysisContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


const SaveBtn = ({ cd, toggleEdit }: { cd: string, toggleEdit: () => void }) => {
    const [editor] = useLexicalComposerContext();
    const { updateCoreDriveDescription } = useOctalysis();

    const handleSave = async () => {
        editor.update(async () => {
          const editorState = editor.getEditorState();
          const json = JSON.stringify(editorState.toJSON());
          updateCoreDriveDescription(cd, json);
          toggleEdit();
          editor.setEditable(false);
        });
    
      };

    return (
        <button onClick={handleSave}>
        Save
      </button>
    )
}

export default SaveBtn;