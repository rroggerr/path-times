import Image from 'next/image';
import styles from '../styles/Home.module.css';

type Props = {
  onClickLocate: () => void;
  isLocating: boolean;
  displayText: string;
};

export const InfoBox = ({ onClickLocate, isLocating }: Props) => {
  const time = new Date();
  const timeStr = time
    .toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    .toLocaleLowerCase();
  return (
    <div className={styles.infoBox}>
      <div className={styles.timeArrow}>
        <p className={styles.timeStr}>{timeStr}</p>
      </div>
      {isLocating ? (
        <p style={{ color: 'white', fontSize: '24px', alignSelf: 'center' }}>
          ...
        </p>
      ) : (
        <button className={styles.locateBtn} onClick={onClickLocate}>
          <Image src="/location-pin.svg" width={55} height={55} alt="Locate" />
        </button>
      )}
    </div>
  );
};
