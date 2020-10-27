import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import Toolbar from "./components/Toolbar";
import Main from "./pages/Main";
import Saved from "./pages/Saved";
import SettingsModal from "./components/SettingsModal";
import SearchModal from "./components/SearchModal";
import ScreenLoader from "./components/ScreenLoader";

// React Context
import { AppProvider as ContextProvider } from "./context/app-context";
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
    <ContextProvider>
      <IonApp>
        <Toolbar />
        <Main />
        <Saved />
        <SettingsModal />
        <SearchModal />
        <ScreenLoader />
      </IonApp>
    </ContextProvider>
  </ReduxProvider>
);

export default App;
