import { useState, useEffect } from 'react';

const REFRESH_INTERVAL = 10000;

export const useClock = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), REFRESH_INTERVAL);
    return () => {
      clearInterval(timer);
    };
  });

  return date
    .toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    .toLocaleLowerCase();
};
