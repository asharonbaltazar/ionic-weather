import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { Main } from '@pages/Main/Main';
import { Settings } from '@pages/settings/Settings';
import { AppProvider as ContextProvider } from '@context/app-context';
import { Search } from '@pages/Main/SearchDrawer/Search';

const App = () => (
  <ContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/settings" component={Settings} />
        <Route path="/search" component={Search} />
        <Route path="/" exact component={Main} />
      </Switch>
    </BrowserRouter>
  </ContextProvider>
);

export default App;
