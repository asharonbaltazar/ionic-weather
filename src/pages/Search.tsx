import React from 'react';
import Searchbar from '@components/Searchbar';
import SearchContent from '@components/SearchContent';
import {
  IonToolbar,
  IonPage,
  IonHeader,
  IonFooter,
  IonTitle,
} from '@ionic/react';
import lightLogo from 'src/assets/google_light.png';
import darkLogo from 'src/assets/google_dark.png';

const SearchModal = () => (
  <IonPage>
    <IonHeader className="ion-no-border">
      <IonToolbar>
        <Searchbar />
      </IonToolbar>
    </IonHeader>
    <SearchContent />
    <IonFooter className="ion-no-border">
      <IonToolbar>
        <IonTitle slot="end">
          <picture>
            <source srcSet={darkLogo} media="(prefers-color-scheme: dark)" />
            <img
              className="h-6 w-36 object-contain"
              src={lightLogo}
              alt="google logo"
            />
          </picture>
        </IonTitle>
      </IonToolbar>
    </IonFooter>
  </IonPage>
);

export default SearchModal;
