import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { useClock } from '../hooks/useClock';
import styles from '../styles/Home.module.css';

type Props = {
  isLocating: boolean;
  isNarrow: boolean;
  displayText: string;
};

export const InfoBox = ({ isNarrow, isLocating, displayText }: Props) => {
  const timeStr = useClock();

  return (
    <div
      className={`${styles.infoBox} ${
        isNarrow
          ? isLocating
            ? styles.narrowInfoBoxLocating
            : styles.narrowInfoBox
          : ''
      }`}
    >
      <div className={styles.timeArrow}>
        <p className={styles.timeStr} suppressHydrationWarning>
          {timeStr}
        </p>
      </div>
      <Marquee gradient={false} speed={isNarrow ? 12 : 50}>
        <p className={styles.marqueeText}>{displayText}</p>
      </Marquee>
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
