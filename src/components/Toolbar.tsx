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
} from "ionicons/icons";
// CSS for the toolbar is found in Main.css

interface IProps {
  address: string;
}

const Toolbar = ({ address }: IProps) => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar>
        {address && <IonTitle>{address}</IonTitle>}
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
