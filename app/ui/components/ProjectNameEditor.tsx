import React, { useState, useEffect } from 'react';
import { useOctalysis } from '@/app/contexts/OctalysisContext';

const ProjectNameEditor: React.FC = () => {
  const { projectName, updateProjectName } = useOctalysis();
  const [isEditing, setIsEditing] = useState(false);
  const [newProjectName, setNewProjectName] = useState(projectName);

  useEffect(() => {
    setNewProjectName(projectName);
  }, [projectName]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (newProjectName !== projectName) {
      updateProjectName(newProjectName);
    }
  };

  return (
    <div style={{fontSize: '18pt', width: '100px', textAlign: 'center' }}>
      {isEditing ? (
        <input
          type='text'
          value={newProjectName}
          onChange={handleNameChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onClick={() => setIsEditing(true)}>{projectName || "Click to edit"}</div>
      )}
    </div>
  );
};

export default ProjectNameEditor;

