import { MouseEventHandler, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/StationToast.module.css';
import { StationInfo } from '../types/Station';

type Props = { recc: StationInfo; setStation: (station: StationInfo) => void };

export const StationToast = ({ recc, setStation }: Props) => {
  const [isHidden, setHidden] = useState(false);

  const handleXClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
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
          alt="Switch station"
        />
        <p className={styles.toastText}>
          Switch to <wbr />
          {recc.name}
        </p>
        <div role="button" className={styles.xbutton} onClick={handleXClick}>
          {'✕'}
        </div>
      </div>
    </div>
  ) : null;
};
