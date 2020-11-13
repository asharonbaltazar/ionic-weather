import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Main from "./pages/Main";
import SettingsModal from "./pages/Settings";
import SearchModal from "./pages/Search";
import ScreenLoader from "./components/ScreenLoader";
import Week from "./pages/Week";
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

const App = () => {
  const { selectedWeather } = useSelector(
    (state: RootState) => state.weatherSlice
  );

  return (
    <ContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" component={Main} />
            <Route path="/search" component={SearchModal} />
            <Route path="/settings" component={SettingsModal} />
            <Route path="/week">
              {"weather" in selectedWeather ? <Week /> : <Redirect to="/" />}
            </Route>
          </IonRouterOutlet>
          <ScreenLoader />
        </IonReactRouter>
      </IonApp>
    </ContextProvider>
  );
};

export default App;
