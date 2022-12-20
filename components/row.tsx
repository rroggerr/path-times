import styles from "../styles/Home.module.css";

interface RowProps {
  circles: string[];
  lineName: string;
  arrMins: number;
  isApproaching: boolean;
  isDelay?: boolean;
}

export const Row = ({
  circles,
  lineName,
  arrMins,
  isDelay,
  isApproaching,
}: RowProps) => {
  return (
    <div className={isApproaching ? styles.rowApproaching : styles.row}>
      <div
        key={circles[0]}
        className={styles.circle}
        style={{
          backgroundColor: circles[0],
          boxShadow: circles[1] ? `20px  20px 0 -2px ${circles[1]}` : "none",
        }}
      ></div>
      <p className={styles.lineText}>{lineName}</p>
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
