import styles from './Value.module.css';
import { useOctalysis } from '@/app/contexts/OctalysisContext';
import { Range } from "react-range";
import React from 'react';

interface ValueProps {
  cd: string;
}

const Value: React.FC<ValueProps> = ({ cd }) => {
  const { data, updateCoreDrivesScore } = useOctalysis();

  const coreDrivesTitle = data[cd].title;
  const coreDrivesScore = data[cd].score;
  const [values, setValues] = React.useState([coreDrivesScore]);

  const handleChange = (values: number[]) => {
    setValues(values)
    updateCoreDrivesScore(cd, values[0]);
  }

  return (
    <div className={styles['octalysis-value']}>
      <label className={styles['core-drive']}><strong>{coreDrivesTitle}</strong></label>
      <div className={styles['core-drive-slider']}>
      <Range
      step={1}
      min={0}
      max={10}
      values={values}
      onChange={(values) => handleChange(values)}
      renderMark={({ props }) => (
        <div
         className={styles['mark']}
          {...props}
          key={props.key}
          style={{
            ...props.style,
          }}
        />
      )}
      renderTrack={({ props, children }) => (
        <div
        className={styles['track']}
          {...props}
          style={{
            ...props.style,
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          className={styles['thumb']}
          {...props}
          key={props.key}
          style={{
            ...props.style,
          }}
        >
          <span>{values[0].toFixed(0)}</span>
        </div>
      )}
    />
      </div>
    </div>
  );
};

export default Value;
