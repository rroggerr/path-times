import styles from "../styles/Home.module.css";

interface RowProps {
  circles: string[];
  lineName: string;
  arrMins: number;
  isDelay?: boolean;
}

export const Row = ({ circles, lineName, arrMins }: RowProps) => {
  return (
    <div className={styles.row}>
      <div
        key={circles[0]}
        className={styles.circle}
        style={{
          backgroundColor: circles[0],
          boxShadow: circles[1] ? `20px  20px 0 -2px ${circles[1]}` : "none",
        }}
      ></div>
      <p className={styles.lineText}>{lineName}</p>
      <div className={styles.timeBox}>
        <p className={styles.timeText}>{arrMins}</p>
        &nbsp;&nbsp;
        <p className={styles.minText}>min</p>
      </div>
    </div>
  );
};
