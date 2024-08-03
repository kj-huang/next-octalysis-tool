'use client';

import styles from './page.module.css';
import { OctalysisProvider } from '@/app/contexts/OctalysisContext';
import OctalysisHeader from '../ui/components/Header/OctalysisHeader';

import OctalysisRadar from '../ui/components/OctalysisRadar';
import OctalysisValue from '../ui/components/Panels/Values/OctalysisValue';
import StickyNote from '../ui/components/StickyNote/StickyNote';
import OctalysisScorePanel from '../ui/components/Panels/ScorePanel/OctalysisScorePanel';
import { useEffect, useRef, useState } from 'react';

export default function OctalysisTool() {
  const editorControlPanelRef = useRef<HTMLDivElement>(null);
  const octalysisHeaderRef = useRef<HTMLDivElement>(null);
  const [rendererDimensions, setRendererDimensions] = useState({ width: 0, height: 0 });
  const [appDimensions, setAppDimensions] = useState({ width: 0, height: 0 });
  const [isEditing, setIsEditing] = useState(true);

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
  
  return (
    <OctalysisProvider>
      <div>
        <div ref={octalysisHeaderRef}>
          <OctalysisHeader dimensions={appDimensions}></OctalysisHeader>
        </div>
        <div className={styles['editor']}>
          <div className={styles['editor-control-panel']} ref={editorControlPanelRef}>
            <OctalysisValue></OctalysisValue>
            <OctalysisScorePanel></OctalysisScorePanel>
          </div>
          <div id="canvas" className={styles['editor-canvas']}>
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
    </OctalysisProvider>
  );
}
