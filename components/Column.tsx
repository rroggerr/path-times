import { MappedTrain } from "../types/Train";
import { InfoBox } from "./InfoBox";
import { Row } from "./row";

interface Props {
  trains: MappedTrain[];
}

const getRemainingTime = (train: MappedTrain) => {
  return Math.max(
    0,
    Math.floor(
      (train.projectedArrival.getTime() - new Date().getTime()) / 60000
    )
  );
};

export const Column = ({ trains }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {trains.map((train) => (
        <Row
          key={train.lineName}
          lineName={train.lineName}
          arrMins={getRemainingTime(train)}
          circles={train.lineColors}
        />
      ))}
      <InfoBox />
    </div>
  );
};
