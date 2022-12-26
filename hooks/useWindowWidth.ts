import {useEffect, useState} from 'react'

export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isNarrow = !!windowWidth && windowWidth < 600;
    return { windowWidth, isNarrow };
  }
