import styles from './Value.module.css';
import React from 'react';
import Value from './Value';

const OctalysisValue: React.FC = () => {
  return (
    <div className={styles['value-border']}>
      <Value cd='CD1' />
      <Value cd='CD2' />
      <Value cd='CD3' />
      <Value cd='CD4' />
      <Value cd='CD5' />
      <Value cd='CD6' />
      <Value cd='CD7' />
      <Value cd='CD8' />
    </div>
  );
};

export default OctalysisValue;
