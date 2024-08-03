import React from 'react';
import styles from './Mask.module.css';

interface MaskProps {
  targetRef: React.RefObject<HTMLElement>;
  message: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  onClick: () => void;
}

const Mask: React.FC<MaskProps> = ({ targetRef, message, position, onClick }) => {
  const [highlightPosition, setHighlightPosition] = React.useState({ top: 0, left: 0, width: 0, height: 0 });
  const [tooltipPosition, setTooltipPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    const updatePositions = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        setHighlightPosition({
          top: rect.top + scrollY,
          left: rect.left + scrollX,
          width: rect.width,
          height: rect.height,
        });

        let tooltipTop = rect.top + scrollY;
        let tooltipLeft = rect.left + scrollX;

        switch (position) {
          case 'top':
            tooltipTop -= 10; // Adjust distance from target
            tooltipLeft += rect.width / 2;
            break;
          case 'right':
            tooltipTop += rect.height / 2;
            tooltipLeft += rect.width + 10;
            break;
          case 'bottom':
            tooltipTop += rect.height + 10;
            tooltipLeft += rect.width / 2;
            break;
          case 'left':
            tooltipTop += rect.height / 2;
            tooltipLeft -= 10;
            break;
        }

        setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
      }
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);

    return () => {
      window.removeEventListener('resize', updatePositions);
    };
  }, [targetRef, position]);

  return (
    <div className={styles.mask} onClick={onClick}>
      <div className={styles.highlight} style={highlightPosition}></div>
      <div
        className={`${styles.tooltip} ${styles[position]}`}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform: position === 'top' || position === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)',
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default Mask;
