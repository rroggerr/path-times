import styles from '../styles/Row.module.css';

interface RowProps {
  circles: string[];
  lineName: string;
  arrMins: number;
  isApproaching: boolean;
  isDelay?: boolean;
  isNarrow: boolean;
  showAbsTime: boolean;
  absTime: string;
  onClick: () => void;
}

export const Row = ({
  circles,
  lineName,
  arrMins,
  isDelay,
  isApproaching,
  isNarrow,
  showAbsTime,
  absTime,
  onClick,
}: RowProps) => {
  const circleOffset = isNarrow ? '-10px' : '-12px';
  return (
    <div
      className={`${isApproaching ? styles.approaching : ''} ${
        isNarrow ? styles.narrowRow : ''
      } ${styles.row}`}
      onClick={onClick}
    >
      <div
        className={isNarrow ? styles.narrowCircle : styles.circle}
        style={{
          backgroundColor: circles[0],
          boxShadow: circles[1]
            ? `${circleOffset} ${circleOffset} 0 -2px ${circles[1]}`
            : 'none',
        }}
      />
      <p className={isNarrow ? styles.narrowLineText : styles.lineText}>
        {lineName}
      </p>
      <>
        {isDelay && (
          <p className={`${styles.timeText} ${styles.delayText}`}>Delay</p>
        )}
        {!isDelay && (
          <div className={`${styles.timeBox} ${styles.fadeInOut}`}>
            {showAbsTime ? (
              <p className={styles.timeText}>{absTime}</p>
            ) : (
              <>
                <p className={styles.timeText}>{arrMins}</p>&nbsp;&nbsp;
                <p className={styles.minText}>min</p>
              </>
            )}
          </div>
        )}
      </>
    </div>
  );
};
