'use client';

import { useEffect, useState } from 'react';
import OctalysisRadar from '../ui/components/OctalysisRadar';
import { OctalysisProvider } from '../contexts/OctalysisContext';
import OctalysisScorePanel from '../ui/components/Panels/ScorePanel/OctalysisScorePanel';
import Editor from '../ui/components/StickyNote/Editor';
import Value from '../ui/components/Panels/Values/Value';

export default function MobileOctalysisTool() {
  const [showCanvas, setShowCanvas] = useState(true);
  const [rendererDimensions, setRendererDimensions] = useState({ width: 0, height: 0 });
  const [currentCd, setCurrentCd] = useState(1); // Start with cd1 by default

  const cdTitles = [
    'CD1: Epic meaning & Calling',
    'CD2: Development & Accomplishment',
    'CD3: Empowerment of Creativity & Feedback',
    'CD4: Ownership & Possession',
    'CD5: Social Influence & Relatedness',
    'CD6: Scarcity & Impatience',
    'CD7: Unpredictability & Curiosity',
    'CD8: Loss & Avoidance',
  ];


  const toggleCd = () => {
    setCurrentCd(currentCd === 1 ? 2 : 1);
  };

  const calculateDimensions = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    setRendererDimensions({
      width: windowWidth,
      height: windowHeight - 250,
    });
  };

  useEffect(() => {
    // Calculate dimensions initially
    calculateDimensions();

    // Recalculate dimensions on window resize
    window.addEventListener('resize', calculateDimensions);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);
  const toggleView = () => {
    setShowCanvas(!showCanvas);
  };

  const handleLeftClick = () => {
    setCurrentCd(currentCd === 1 ? 8 : currentCd - 1);
  };

  const handleRightClick = () => {
    setCurrentCd(currentCd === 8 ? 1 : currentCd + 1);
  };

  return (
    <OctalysisProvider>
      <div>
        <div id='main-area'>
          {showCanvas ? (
            <OctalysisRadar width={rendererDimensions.width} height={rendererDimensions.height}></OctalysisRadar>
          ) : (
            <OctalysisScorePanel></OctalysisScorePanel>
          )}
          <button onClick={toggleView}>{showCanvas ? 'Switch to Scoreboard' : 'Switch to Canvas'}</button>
        </div>

              <div id="containers">
        <div id="nav-bar">
          <button onClick={handleLeftClick}>&lt; {/* Left arrow */}</button>
          <div id="cd-title">{cdTitles[currentCd - 1]}</div>
          <button onClick={handleRightClick}>&gt; {/* Right arrow */}</button>
        </div>

        <div id={`cd${currentCd}-container`}>
          <Value cd={`CD${currentCd}`}/>
          <Editor cd={`CD${currentCd}`} onEditingChange={ (isEditing: boolean) => {}}></Editor>
        </div>
      </div>
      </div>
    </OctalysisProvider>
  );
}
