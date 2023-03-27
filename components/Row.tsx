import Image from 'next/image';
import styles from '../styles/Row.module.css';
import { getLineName } from '../utils/getLineName';

interface RowProps {
  circles: string[];
  lineName: string;
  arrMins: number;
  isApproaching: boolean;
  isDelay?: boolean;
  isNarrow: boolean;
  showAbsTime: boolean;
  absTime: string;
  onTimeClick: () => void;
  hasAlert?: boolean;
  onAlertClick: () => void;
}

export const Row = ({
  hasAlert,
  circles,
  lineName,
  arrMins,
  isDelay,
  isApproaching,
  isNarrow,
  showAbsTime,
  absTime,
  onTimeClick,
  onAlertClick,
}: RowProps) => {
  const circleOffset = isNarrow ? '-10px' : '-12px';

  const handleAlertClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onAlertClick();
  };

  return (
    <div
      className={`${isApproaching ? styles.approaching : ''} ${
        isNarrow ? styles.narrowRow : ''
      } ${styles.row}`}
      onClick={onTimeClick}
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
        {getLineName(lineName, isNarrow)}
      </p>
      {hasAlert ? (
        <button className={styles.alertButton} onClick={handleAlertClick}>
          <Image src="/alert.svg" width={28} height={28} alt="alert" />
        </button>
      ) : (
        <p>&nbsp;</p>
      )}
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
