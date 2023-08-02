import { useClock } from '../hooks/useClock';
import styles from '../styles/TopNav.module.css';
import { StationInfo } from '../types/Station';
import { FALLBACK_STATION, STATIONS } from '../utils/StationInfo';

type Props = {
  isNarrow: boolean;
  selectedStation: StationInfo;
  setStation: (station: StationInfo) => void;
};

export const TopNav = ({ selectedStation, setStation, isNarrow }: Props) => {
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
        <p suppressHydrationWarning>{timeStr}</p>
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
    </div>
  );
};
