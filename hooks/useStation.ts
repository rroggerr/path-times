import { useEffect, useRef, useState } from 'react';
import { getNearestStation } from '../components/getStation';
import { StationInfo } from '../types/Station';
import { FALLBACK_STATION } from '../utils/StationInfo';

export const useStation = () => {
  const isModified = useRef(false);
  const [isLocating, setIsLocating] = useState(false);
  const [station, _setStation] = useState<StationInfo>(FALLBACK_STATION);

  const setStation = (s: StationInfo) => {
    _setStation(s);
    isModified.current = true;
  };

  useEffect(() => {
    relocate();
  }, []);

  const relocate = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nearest = getNearestStation(coords);
        setIsLocating(false);
        if (isModified.current === false) {
          _setStation(nearest);
        }
      },
      () => {
        setIsLocating(false);
      }
    );
  };

  return { station, relocate, isLocating, setStation };
};
