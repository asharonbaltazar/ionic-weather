import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import "../css/segment.css";

const DaysSegment = () => {
  return (
    <div className="segment">
      <IonSegment onIonChange={() => {}}>
        <IonSegmentButton value="today">
          <IonLabel>Today</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="tomorrow">
          <IonLabel>Tomorrow</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="Next week">
          <IonLabel>Next Week</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </div>
  );
};

export default DaysSegment;
