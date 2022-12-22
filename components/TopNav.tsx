import styles from '../styles/TopNav.module.css';
import { StationInfo } from '../types/Station';
import { FALLBACK_STATION, STATIONS } from '../utils/StationInfo';

type Props = {
  selectedStation: StationInfo;
  setStation: (station: StationInfo) => void;
};

export const TopNav = ({ selectedStation, setStation }: Props) => {
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
      <form onSubmit={(e) => e.preventDefault()}>
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
