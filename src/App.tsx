import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import Toolbar from "./components/Toolbar";
import WeatherContent from "./components/WeatherContent";
import SettingsModal from "./components/SettingsModal";
import SearchModal from "./components/SearchModal";
// React Context
import { AppProvider } from "./context/app-context";
import { IonApp } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App = () => (
  <ReduxProvider store={store}>
    <AppProvider>
      <IonApp>
        <Toolbar />
        <WeatherContent />
        <SettingsModal />
        <SearchModal />
      </IonApp>
    </AppProvider>
  </ReduxProvider>
);

export default App;
