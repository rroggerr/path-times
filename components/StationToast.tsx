import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/StationToast.module.css';
import { StationInfo } from '../types/Station';

type Props = { recc: StationInfo; setStation: (station: StationInfo) => void };

export const StationToast = ({ recc, setStation }: Props) => {
  const [isHidden, setHidden] = useState(false);
  const locationPrompt = `Switch to ${recc.name}`;

  const handleXClick = () => {
    setHidden(true);
  };

  const handleSetStation = () => {
    setStation(recc);
    setHidden(true);
  };

  return !isHidden ? (
    <div
      role="button"
      className={styles.toastWrapper}
      onClick={handleSetStation}
    >
      <div className={styles.toast}>
        <Image
          src="/location-pin.svg"
          width={20}
          height={20}
          alt={locationPrompt}
        />
        &nbsp;&nbsp;&nbsp;
        <p className={styles.toastText}>{locationPrompt}</p>
        &nbsp;&nbsp;&nbsp;
        <div role="button" className={styles.toastText} onClick={handleXClick}>
          {'✕'}
        </div>
      </div>
    </div>
  ) : null;
};
