import React from 'react';

interface TutorialsProps {
  onTutorialStart: () => void;
}

const Tutorials: React.FC<TutorialsProps> = ({  onTutorialStart }) => {
  const playTutorials = async () => {
    onTutorialStart();
  }
  return (
    <div style={{display: 'flex', alignItems: 'center'}}  onClick={playTutorials}>
      <span className="material-symbols-outlined">flag</span>
      <button>Tutorials</button>
    </div>
  );
};

export default Tutorials;
