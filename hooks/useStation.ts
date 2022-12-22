import { useEffect, useState } from 'react';
import { getNearestStation } from '../components/getStation';
import { StationInfo } from '../types/Station';
import { FALLBACK_STATION } from '../utils/StationInfo';

export const useStation = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [station, setStation] = useState<StationInfo>(FALLBACK_STATION);

  useEffect(() => {
    relocate();
  }, []);

  const relocate = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nearest = getNearestStation(coords);
        setIsLocating(false);
        setStation(nearest);
      },
      () => {
        setIsLocating(false);
      }
    );
  };

  return { station, relocate, isLocating };
};
