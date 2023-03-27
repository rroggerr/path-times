import Image from 'next/image';
import { useClock } from '../hooks/useClock';
import styles from '../styles/TopNav.module.css';
import { StationInfo } from '../types/Station';
import { FALLBACK_STATION, STATIONS } from '../utils/StationInfo';

type Props = {
  isLocating: boolean;
  isNarrow: boolean;
  selectedStation: StationInfo;
  setStation: (station: StationInfo) => void;
};

export const TopNav = ({
  selectedStation,
  setStation,
  isLocating,
  isNarrow,
}: Props) => {
  const timeStr = useClock();

  const handleStationSelect = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setStation(
      STATIONS.find((station) => station.station === target.value) ??
        FALLBACK_STATION
    );
  };

  return (
    <div className={styles.nav}>
      <div className={isNarrow ? styles.timeArrowNarrow : styles.timeArrow}>
        <p
          className={isNarrow ? styles.timeStrNarrow : styles.timeStr}
          suppressHydrationWarning
        >
          {timeStr}
        </p>
      </div>
      <form className={styles.dropdown} onSubmit={(e) => e.preventDefault()}>
        <select
          className={styles.navForm}
          value={selectedStation.station}
          onChange={handleStationSelect}
        >
          {STATIONS.map((station) => (
            <option key={station.station} value={station.station}>
              {station.name}
            </option>
          ))}
        </select>
      </form>
      {isLocating && (
        <Image
          className={styles.flashing}
          src="/location-pin.svg"
          width={isNarrow ? 28 : 42}
          height={isNarrow ? 28 : 42}
          alt="Locating"
        />
      )}
    </div>
  );
};
