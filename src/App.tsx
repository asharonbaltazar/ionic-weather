import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Main from '@pages/Main/Main';
import SettingsModal from '@pages/Settings';
import SearchModal from '@pages/Search';
import { AppProvider as ContextProvider } from '@context/app-context';

const App = () => (
  <ContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/search" component={SearchModal} />
        <Route path="/settings" component={SettingsModal} />
        <Route path="/" exact component={Main} />
      </Switch>
    </BrowserRouter>
  </ContextProvider>
);

export default App;
