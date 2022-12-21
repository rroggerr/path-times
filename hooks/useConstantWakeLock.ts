import { useEffect } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';

export const useConstantWakeLock = () => {
  const { isSupported, request, release } = useWakeLock({});

  useEffect(() => {
    if (isSupported) {
      request();
    }

    return () => {
      release();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
