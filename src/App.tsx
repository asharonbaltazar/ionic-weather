import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Main from './pages/Main';
import SettingsModal from './pages/Settings';
import SearchModal from './pages/Search';
import ScreenLoader from './components/ScreenLoader';
import Week from './pages/Week';
// React Context
import { AppProvider as ContextProvider } from './context/app-context';

setupIonicReact();
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
              {selectedWeather?.weather ? <Week /> : <Redirect to="/" />}
            </Route>
          </IonRouterOutlet>
          <ScreenLoader />
        </IonReactRouter>
      </IonApp>
    </ContextProvider>
  );
};

export default App;
