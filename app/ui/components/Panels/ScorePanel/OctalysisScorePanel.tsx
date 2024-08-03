import styles from './OctalysisScorePanel.module.css';
import React, { useEffect, useState } from 'react';
import { useOctalysis } from '@/app/contexts/OctalysisContext';
import OctalysisScoreHelper from './OctalysisScoreHelper';

const OctalysisScorePanel: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [summary, setSummary] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const { data } = useOctalysis();

  useEffect(() => {
    const op = new OctalysisScoreHelper();
  
    // Calculate and update score, summary, and feedback based on the current data
    setScore(op.GetTotalScore(data));
    setSummary(op.GetSummary2(data));
    setFeedback(op.GetFeedback2(data));
  }, [data]);

  return (
    <div className={styles['score-board']}>
      <div className={styles['text-overline']}>Score: {score}</div>
      <p style={{ margin: 0 }}>{summary}</p>
      <hr className={styles['divided-line']} />
      <p style={{ margin: 0 }} className='result-area'>
          {feedback}
        </p>
    </div>
  );
};

export default OctalysisScorePanel;
