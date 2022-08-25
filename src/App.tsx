import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { Main } from '@pages/main/Main';
import { Settings } from '@pages/settings/Settings';
import { Search } from '@pages/search/Search';
import { NextSevenDays } from '@pages/week/NextSevenDays';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/search" component={Search} />
      <Route path="/week" component={NextSevenDays} />
      <Route path="/" exact component={Main} />
    </Switch>
  </BrowserRouter>
);

export default App;
