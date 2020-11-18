import React from "react";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonHeader,
} from "@ionic/react";
import {
  searchSharp,
  settingsSharp,
  settingsOutline,
  searchOutline,
  navigateSharp,
  navigateOutline,
} from "ionicons/icons";
// CSS for the toolbar is found in Main.css

interface IProps {
  address: string;
  geolocation: boolean;
}

const Toolbar = ({ address, geolocation }: IProps) => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar>
        {address && (
          <IonTitle>
            <h5>
              {address}{" "}
              {geolocation && (
                <IonIcon
                  color="primary"
                  size="small"
                  md={navigateSharp}
                  ios={navigateOutline}
                />
              )}
            </h5>
          </IonTitle>
        )}
        <IonButtons slot="end">
          <IonButton routerLink="/search">
            <IonIcon
              slot="icon-only"
              md={searchSharp}
              ios={searchOutline}
              color="primary"
            />
          </IonButton>
          <IonButton routerLink="/settings">
            <IonIcon
              slot="icon-only"
              md={settingsSharp}
              ios={settingsOutline}
              color="primary"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Toolbar;
