import { setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useRef, useState } from 'react';
import { getNearestStation } from '../components/getStation';
import { StationInfo } from '../types/Station';
import { FALLBACK_STATION, STATIONS } from '../utils/StationInfo';

const COOKIE_KEY = '_prev_user_stn';

export const getPrevStation = (ctx: GetServerSidePropsContext) => {
  return ctx.req.cookies[COOKIE_KEY];
};

export const useStation = (prevStation: string) => {
  const foundStation = STATIONS.find((si) => si.station === prevStation);

  const isModified = useRef(false);
  const [isLocating, setIsLocating] = useState(false);
  const [station, _setStation] = useState<StationInfo>(
    foundStation ?? FALLBACK_STATION
  );

  const setStation = (s: StationInfo) => {
    _setStation(s);
    isModified.current = true;
    setCookie(COOKIE_KEY, s.station);
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
          setCookie(COOKIE_KEY, nearest.station);
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
