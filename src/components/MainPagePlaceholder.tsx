import React from "react";
import { IonIcon } from "@ionic/react";
import {
  searchSharp,
  cloudCircleSharp,
  searchOutline,
  cloudCircleOutline,
} from "ionicons/icons";

const MainPagePlaceholder = () => {
  return (
    <div className="empty-placeholder">
      <IonIcon
        className="placeholder-icon"
        md={cloudCircleSharp}
        ios={cloudCircleOutline}
      />
      <h2>Welcome to Ionic Weather</h2>
      <h3>
        To search, tap the <IonIcon md={searchSharp} ios={searchOutline} />{" "}
        above
      </h3>
    </div>
  );
};

export default MainPagePlaceholder;
