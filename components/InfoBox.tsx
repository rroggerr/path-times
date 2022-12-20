import styles from "../styles/Home.module.css";

export const InfoBox = () => {
  const time = new Date();
  const timeStr = time
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    .toLocaleLowerCase();
  return (
    <div className={styles.infoBox}>
      <div className={styles.timeArrow}>
        <p className={styles.timeStr}>{timeStr}</p>
      </div>
    </div>
  );
};
