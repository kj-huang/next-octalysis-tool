'use client';

import styles from './Header.module.css';
import React from 'react';
import Image from 'next/image';
import ExportPng from './ExportPng';
import ExportOctagon from './ExportOctagon';
import { useOctalysis } from '@/app/contexts/OctalysisContext';
import Tutorials from './Tutorials';

interface OctalysisHeaderProps {
  dimensions: { width: number; height: number };
  onTutorialStart: () => void;
}

const OctalysisHeader: React.FC<OctalysisHeaderProps> = ({ dimensions, onTutorialStart }) => {
  const { projectName } = useOctalysis();
  return (
    <div className={styles['header']}>
      <div className={styles['brand']}>
        <Image src='/assets/octagon.png' alt='Octagon' width={50} height={50} />
        <span>Octalysis Tool</span>
      </div>
      <div className={styles['tools']}>
        <Tutorials onTutorialStart={onTutorialStart} />
        <ExportPng projectName={projectName} dimensions={dimensions}/>
        <ExportOctagon projectName={projectName} dimensions={dimensions} />
      </div>
    </div>
  );
};

export default OctalysisHeader;
