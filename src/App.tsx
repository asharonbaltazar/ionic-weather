import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { Main } from '@pages/Main/Main';
import { Settings } from '@pages/settings/Settings';
import { Search } from '@pages/Main/SearchDrawer/Search';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/search" component={Search} />
      <Route path="/" exact component={Main} />
    </Switch>
  </BrowserRouter>
);

export default App;
