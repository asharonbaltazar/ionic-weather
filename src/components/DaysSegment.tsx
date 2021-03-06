import React, { useContext } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { AppContext } from "../context/app-context";
import { arrowForwardSharp, chevronForward } from "ionicons/icons";
import "../css/segment.css";

const DaysSegment = () => {
  const { segmentCarouselOption, toggleSegmentsCarousel } = useContext(
    AppContext
  );

  return (
    <div className="segment ion-padding-start ion-padding-end">
      <div>
        <IonButton
          fill={segmentCarouselOption === "today" ? "outline" : "clear"}
          color="primary"
          onClick={() => toggleSegmentsCarousel("today")}
        >
          Today
        </IonButton>
        <IonButton
          fill={segmentCarouselOption === "tomorrow" ? "outline" : "clear"}
          color="primary"
          onClick={() => toggleSegmentsCarousel("tomorrow")}
        >
          Tomorrow
        </IonButton>
      </div>
      <IonButton className="next-7-days" fill="clear" routerLink="/week">
        Next 7 days
        <IonIcon slot="end" ios={chevronForward} md={arrowForwardSharp} />
      </IonButton>
    </div>
  );
};

export default DaysSegment;
