import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { Main } from 'src/pages/Main/Main';
import { Settings } from 'src/pages/Settings/Settings';
import { Search } from 'src/pages/Search/Search';
import { Weekly } from 'src/pages/Weekly/Weekly';
import { Hourly } from 'src/pages/Hourly/Hourly';

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
