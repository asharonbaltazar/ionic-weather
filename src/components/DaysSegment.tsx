import React, { useContext } from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { AppContext } from "../context/app-context";
import "../css/segment.css";

const DaysSegment = () => {
  const { segmentCarouselOption, toggleSegmentsCarousel } = useContext(
    AppContext
  );

  return (
    <div className="segment">
      <IonSegment
        onIonChange={e => toggleSegmentsCarousel(e.detail.value)}
        value={segmentCarouselOption}
      >
        <IonSegmentButton value="today">
          <IonLabel>Today</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="tomorrow">
          <IonLabel>Tomorrow</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="next_week">
          <IonLabel>Next 7 Days</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </div>
  );
};

export default DaysSegment;
