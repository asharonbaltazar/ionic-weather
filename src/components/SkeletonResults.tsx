import React from "react";
import { IonLabel, IonItem, IonIcon, IonSkeletonText } from "@ionic/react";
import { locationSharp, locationOutline } from "ionicons/icons";

const SkeletonResults = () => {
  return (
    <>
      <IonItem>
        <IonIcon
          color={"primary"}
          ios={locationOutline}
          md={locationSharp}
          slot="start"
        />
        <IonLabel>
          <IonSkeletonText animated style={{ width: "40%" }} />
          <IonSkeletonText animated style={{ width: "20%" }} />
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonIcon
          color={"primary"}
          ios={locationOutline}
          md={locationSharp}
          slot="start"
        />
        <IonLabel>
          <IonSkeletonText animated style={{ width: "40%" }} />
          <IonSkeletonText animated style={{ width: "20%" }} />
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonIcon
          color={"primary"}
          ios={locationOutline}
          md={locationSharp}
          slot="start"
        />
        <IonLabel>
          <IonSkeletonText animated style={{ width: "40%" }} />
          <IonSkeletonText animated style={{ width: "20%" }} />
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonIcon
          color={"primary"}
          ios={locationOutline}
          md={locationSharp}
          slot="start"
        />
        <IonLabel>
          <IonSkeletonText animated style={{ width: "40%" }} />
          <IonSkeletonText animated style={{ width: "20%" }} />
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonIcon
          color={"primary"}
          ios={locationOutline}
          md={locationSharp}
          slot="start"
        />
        <IonLabel>
          <IonSkeletonText animated style={{ width: "40%" }} />
          <IonSkeletonText animated style={{ width: "20%" }} />
        </IonLabel>
      </IonItem>
    </>
  );
};

export default SkeletonResults;
