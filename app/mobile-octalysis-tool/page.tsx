'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import OctalysisRadar from '../ui/components/OctalysisRadar';
import { OctalysisProvider } from '../contexts/OctalysisContext';
import OctalysisScorePanel from '../ui/components/Panels/ScorePanel/OctalysisScorePanel';
import Value from '../ui/components/Panels/Values/Value';
import MobileEditor from '../ui/components/MobileEditor/MobileEditor';

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

  const calculateDimensions = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    setRendererDimensions({
      width: windowWidth,
      height: windowHeight,
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
    if (currentCd > 1) {
      setCurrentCd(currentCd - 1);
    }
  };

  const handleRightClick = () => {
    if (currentCd < cdTitles.length) {
      setCurrentCd(currentCd + 1);
    }
  };

  return (
    <OctalysisProvider>
      <div>
        <header className={styles.header}>
          <h1>Mobile Octalysis Tool</h1>
        </header>

        <div id='main-area' className={styles.mainArea}>
          <OctalysisRadar width={rendererDimensions.width} height={rendererDimensions.height}></OctalysisRadar>
        </div>

        {/* Style Button */}
        <button onClick={toggleView} className={styles.toggleButton}>
          {showCanvas ? 'Switch to Scoreboard' : 'Switch to Editor'}
        </button>

        {showCanvas ? (
        <div className={styles.containers}>
          <div className={styles.navBar}>
            <button onClick={handleLeftClick} className={styles.navBarButton}>
            <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className={styles.cdTitle}>{cdTitles[currentCd - 1]}</div>
            <button onClick={handleRightClick} className={styles.navBarButton}>
            <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {cdTitles.map((title, index) => (
            <div
              key={index}
              id={`cd${index + 1}-container`}
              className={`${styles.cdContainer} ${
                currentCd === index + 1 ? styles.visible : styles.hidden
              }`}
            >
              <Value cd={`CD${index + 1}`} />
              <MobileEditor cd={`CD${index + 1}`}></MobileEditor>
            </div>
          ))}
        </div>
        ) : (
          <OctalysisScorePanel></OctalysisScorePanel>
        )}
      </div>
    </OctalysisProvider>
  );
}
