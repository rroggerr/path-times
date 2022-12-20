import { MappedTrain, Status } from "../types/Train";
import { InfoBox } from "./InfoBox";
import { Row } from "./row";
import styles from "../styles/Home.module.css";

interface Props {
  trains: MappedTrain[];
}

const getRemainingTime = (train: MappedTrain) => {
  return Math.max(
    0,
    Math.round(
      (train.projectedArrival.getTime() - new Date().getTime()) / 60000
    )
  );
};

export const Column = ({ trains }: Props) => {
  return (
    <div className={styles.column}>
      {trains.map((train) => (
        <Row
          key={train.lineName}
          lineName={train.lineName}
          arrMins={getRemainingTime(train)}
          circles={train.lineColors}
          isApproaching={train.status === Status.ARRIVING_NOW}
          isDelay={train.status === Status.DELAY}
        />
      ))}
      <InfoBox />
    </div>
  );
};
