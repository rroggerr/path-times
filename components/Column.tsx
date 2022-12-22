import { useState } from 'react';
import { Train, Status } from '../types/Train';
import { Row } from './Row';
import styles from '../styles/Home.module.css';

interface Props {
  trains: Train[];
  isNarrow: boolean;
}

const getRemainingTime = (train: Train) => {
  if (train.status === Status.ARRIVING_NOW) {
    return 0;
  }
  return Math.max(
    1,
    Math.round(
      (new Date(train.projectedArrival).getTime() - new Date().getTime()) /
        60000
    )
  );
};

const getAbsTime = (train: Train) => {
  return new Date(train.projectedArrival).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const Column = ({ trains, isNarrow }: Props) => {
  const [showAbsTime, setShowAbsTime] = useState(false);
  const toggleAbsTime = () => {
    setShowAbsTime((show) => !show);
  };
  return (
    <div className={styles.column}>
      {trains.map((train) => {
        const arrMins = getRemainingTime(train);
        return (
          <Row
            key={`${train.lineName}-${train.status}-${arrMins}`}
            lineName={train.lineName}
            arrMins={arrMins}
            circles={train.lineColors}
            isApproaching={train.status === Status.ARRIVING_NOW}
            isDelay={train.status === Status.DELAY}
            isNarrow={isNarrow}
            showAbsTime={showAbsTime}
            absTime={getAbsTime(train)}
            onClick={toggleAbsTime}
          />
        );
      })}
    </div>
  );
};
