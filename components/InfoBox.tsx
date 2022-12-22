import Image from 'next/image';
import styles from '../styles/Home.module.css';

type Props = {
  isLocating: boolean;
  displayText: string;
};

export const InfoBox = ({ isLocating, displayText }: Props) => {
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
      <p>{displayText}</p>
      {isLocating && (
        <Image
          className={styles.flashing}
          src="/location-pin.svg"
          width={42}
          height={42}
          alt="Locating"
        />
      )}
    </div>
  );
};
