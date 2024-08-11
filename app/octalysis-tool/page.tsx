'use client';

import styles from './page.module.css';
import { OctalysisProvider } from '@/app/contexts/OctalysisContext';
import OctalysisHeader from '../ui/components/Header/OctalysisHeader';

import OctalysisRadar from '../ui/components/OctalysisRadar';
import OctalysisValue from '../ui/components/Panels/Values/OctalysisValue';
import StickyNote from '../ui/components/StickyNote/StickyNote';
import OctalysisScorePanel from '../ui/components/Panels/ScorePanel/OctalysisScorePanel';
import { useEffect, useRef, useState } from 'react';
import Mask from './Mask';

export default function OctalysisTool() {
  const editorControlPanelRef = useRef<HTMLDivElement>(null);
  const octalysisHeaderRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const [rendererDimensions, setRendererDimensions] = useState({ width: 0, height: 0 });
  const [appDimensions, setAppDimensions] = useState({ width: 0, height: 0 });
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [, setHasTutorialPlayed] = useState(false);

  const calculateDimensions = () => {
    const editorPanelWidth = editorControlPanelRef.current?.offsetWidth || 0;
    const headerHeight = octalysisHeaderRef.current?.offsetHeight || 0;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    setAppDimensions({ width: windowWidth, height: windowHeight });

    setRendererDimensions({
      width: windowWidth - editorPanelWidth,
      height: windowHeight - headerHeight,
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

  useEffect(() => {
    const hasPlayed = localStorage.getItem('hasTutorialPlayed');
    if (hasPlayed === 'false' || hasPlayed === null) {
      startTutorial();
    } else {
      setHasTutorialPlayed(true);
    }
  }, []);

  const tutorialRefs = [
    { ref: octalysisHeaderRef, message: 'This is an onboarding tutorial, just click to continue to see the full introduction.', position: 'bottom' },
    { ref: octalysisHeaderRef, message: 'This is the header where you can see the main controls.', position: 'bottom' },
    {
      ref: editorControlPanelRef,
      message: 'This is the control panel where you can adjust values and scores.',
      position: 'right',
    },
    {
      ref: radarRef,
      message: 'This is the radar chart where your data visualization will appear. Double click to edit Sticky Notes',
      position: 'top',
    },
    {
      ref: radarRef,
      message: 'Let\'s start by changing some values to the radar chart. Move on the "Values" tab on the left.',
      position: 'top',
    },
  ];

  const handleNextStep = () => {
    if (tutorialStep < tutorialRefs.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      endTutorial();
    }
  };

  const startTutorial = () => {
    setTutorialStep(0);
    setIsTutorialActive(true);
    setHasTutorialPlayed(true);
  };

  const endTutorial = () => {
    setIsTutorialActive(false);
    localStorage.setItem('hasTutorialPlayed', 'true');
  };

  return (
    <OctalysisProvider>
      <div>
        <div ref={octalysisHeaderRef}>
          <OctalysisHeader dimensions={appDimensions} onTutorialStart={startTutorial}></OctalysisHeader>
        </div>
        <div className={styles['editor']}>
          <div className={styles['editor-control-panel']} ref={editorControlPanelRef}>
            <OctalysisValue></OctalysisValue>
            <OctalysisScorePanel></OctalysisScorePanel>
          </div>
          <div id='canvas' className={styles['editor-canvas']} ref={radarRef}>
            <OctalysisRadar width={rendererDimensions.width} height={rendererDimensions.height}></OctalysisRadar>
            <StickyNote cd='CD1'></StickyNote>
            <StickyNote cd='CD2'></StickyNote>
            <StickyNote cd='CD3'></StickyNote>
            <StickyNote cd='CD4'></StickyNote>
            <StickyNote cd='CD5'></StickyNote>
            <StickyNote cd='CD6'></StickyNote>
            <StickyNote cd='CD7'></StickyNote>
            <StickyNote cd='CD8'></StickyNote>
          </div>
        </div>
      </div>

      {isTutorialActive && (
        <Mask
          targetRef={tutorialRefs[tutorialStep].ref}
          message={tutorialRefs[tutorialStep].message}
          position={tutorialRefs[tutorialStep].position}
          onClick={handleNextStep}
        />
      )}
    </OctalysisProvider>
  );
}
