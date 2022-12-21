import { useEffect, useState } from 'react';
import { getNearestStation } from '../components/getStation';
import { Station } from '../types/Station';

export const useStation = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [station, setStation] = useState<Station>(Station.WORLD_TRADE_CENTER);

  useEffect(() => {
    relocate();
  }, []);

  const relocate = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { station } = getNearestStation(coords);
        setIsLocating(false);
        setStation(station);
      },
      () => {
        setIsLocating(false);
      }
    );
  };

  return { station, relocate, isLocating };
};
