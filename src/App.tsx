import React from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import Main from "./pages/Main";
import SettingsModal from "./components/SettingsModal";
import SearchModal from "./components/SearchModal";
import ScreenLoader from "./components/ScreenLoader";

// React Context
import { AppProvider as ContextProvider } from "./context/app-context";

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
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" component={Main} />
            <Route path="/search" component={SearchModal} />
            <Route path="/settings" component={SettingsModal} />
          </IonRouterOutlet>
          <ScreenLoader />
        </IonReactRouter>
      </IonApp>
    </ContextProvider>
  </ReduxProvider>
);

// <Main />
// <Saved />
// <SettingsModal />
// <SearchModal />

export default App;
