import styles from '../styles/Home.module.css';
import { getShortLineName } from './getLineName';

interface RowProps {
  circles: string[];
  lineName: string;
  arrMins: number;
  isApproaching: boolean;
  isDelay?: boolean;
  isNarrow: boolean;
}

export const Row = ({
  circles,
  lineName,
  arrMins,
  isDelay,
  isApproaching,
  isNarrow,
}: RowProps) => {
  const displayLineName = isNarrow ? getShortLineName(lineName) : lineName;
  const circleOffset = isNarrow ? '-10px' : '-12px';
  return (
    <div
      className={`${isApproaching ? styles.approaching : ''} ${
        isNarrow ? styles.narrowRow : styles.row
      }`}
    >
      <div
        className={isNarrow ? styles.narrowCircle : styles.circle}
        style={{
          backgroundColor: circles[0],
          boxShadow: circles[1]
            ? `${circleOffset} ${circleOffset} 0 -2px ${circles[1]}`
            : 'none',
        }}
      ></div>
      <p className={styles.lineText}>{displayLineName}</p>
      <>
        {isDelay && (
          <p className={`${styles.timeText} ${styles.delayText}`}>Delay</p>
        )}
        {!isDelay && (
          <div className={`${styles.timeBox} ${styles.fadeInOut}`}>
            <p className={styles.timeText}>{arrMins}</p>&nbsp;&nbsp;
            <p className={styles.minText}>min</p>
          </div>
        )}
      </>
    </div>
  );
};
