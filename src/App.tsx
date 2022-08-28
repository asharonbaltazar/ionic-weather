import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { Main } from '@pages/Main/Main';
import { Settings } from '@pages/settings/Settings';
import { Search } from '@pages/search/Search';
import { Weekly } from '@pages/weekly/Weekly';
import { Hourly } from '@pages/hourly/Hourly';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/search" component={Search} />
      <Route path="/hourly" component={Hourly} />
      <Route path="/weekly" component={Weekly} />
      <Route path="/" exact component={Main} />
    </Switch>
  </BrowserRouter>
);

export default App;
