import React from "react";
import { IonIcon } from "@ionic/react";
import {
  searchSharp,
  search,
  cloudCircleSharp,
  cloudCircle,
} from "ionicons/icons";

const MainPagePlaceholder = () => {
  return (
    <div className="empty-placeholder">
      <IonIcon
        className="placeholder-icon"
        md={cloudCircleSharp}
        ios={cloudCircle}
      />
      <h2>Welcome to Ionic Weather</h2>
      <h3>
        To begin, tap the <IonIcon md={searchSharp} ios={search} /> to search
      </h3>
    </div>
  );
};

export default MainPagePlaceholder;
