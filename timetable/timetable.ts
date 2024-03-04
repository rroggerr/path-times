import { Station } from '../types/Station';

type TimeTable = {
};

const weekday: TimeTable = {};

const saturday: TimeTable = {};

const sunday: TimeTable = {};

export const getTimetable = (): TimeTable => {
  const today = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
  });
  switch (today.toUpperCase()) {
    case 'SUN':
      return sunday;
    case 'SAT':
      return saturday;
    default:
      return weekday;
  }
};
