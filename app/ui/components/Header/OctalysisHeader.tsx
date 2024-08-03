'use client';

import styles from './Header.module.css';
import React from 'react';
import Image from 'next/image';
import ExportPng from './ExportPng';
import ExportOctagon from './ExportOctagon';
import { useOctalysis } from '@/app/contexts/OctalysisContext';

const OctalysisHeader = ({dimensions}: {dimensions : {width: number, height: number}}) => {
  const { projectName } = useOctalysis();
  return (
    <div className={styles['header']}>
      <div className={styles['brand']}>
        <Image src='/assets/octagon.png' alt='Octagon' width={50} height={50} />
        <span>Octalysis Tool</span>
      </div>
      <div className={styles['tools']}>
        <ExportPng projectName={projectName} dimensions={dimensions}/>
        <ExportOctagon projectName={projectName} dimensions={dimensions} />
      </div>
    </div>
  );
};

export default OctalysisHeader;
