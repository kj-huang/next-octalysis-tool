import { useState } from 'react';

export function TextNode({ data }: { data: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save the updated data if necessary
  };

  return (
    <div style={{ padding: 10, display: 'flex' }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <button onClick={handleSave} style={{ marginLeft: 8 }}>
            Save
          </button>
        </>
      ) : (
        <>
          <div onDoubleClick={handleEdit} >{label}</div>
        </>
      )}
    </div>
  );
}
