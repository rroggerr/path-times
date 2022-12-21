import { Train, Status } from "../types/Train";
import { InfoBox } from "./InfoBox";
import { Row } from "./row";
import styles from "../styles/Home.module.css";

interface Props {
  trains: Train[];
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

export const Column = ({ trains }: Props) => {
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
          />
        );
      })}
      <InfoBox />
    </div>
  );
};
