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
          fill={segmentCarouselOption === "today" ? "solid" : "clear"}
          color="primary"
          onClick={() => toggleSegmentsCarousel("today")}
        >
          Today
        </IonButton>
        <IonButton
          fill={segmentCarouselOption === "tomorrow" ? "solid" : "clear"}
          color="primary"
          onClick={() => toggleSegmentsCarousel("tomorrow")}
        >
          Tomorrow
        </IonButton>
      </div>
      <div>
        <IonButton className="next-7-days" fill="clear">
          Next 7 days
          <IonIcon slot="end" ios={chevronForward} md={arrowForwardSharp} />
        </IonButton>
      </div>
    </div>
  );
};

export default DaysSegment;
