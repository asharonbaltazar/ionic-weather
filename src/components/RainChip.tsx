import React from "react";
import { IonChip } from "@ionic/react";

interface IProps {
  pop: number;
}

const RainChip = ({ pop }: IProps) => {
  return (
    <>
      {pop && pop > 0.1 ? (
        <IonChip
          className="pop-chip ion-padding-start ion-padding-end"
          color="primary"
        >
          <h5>Chance of rain</h5>
          <h5>{Math.floor(pop * 100)}%</h5>
        </IonChip>
      ) : (
        <div style={{ height: "32px", margin: "10px 0" }}></div>
      )}
    </>
  );
};

export default RainChip;
