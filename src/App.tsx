import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { MainPage } from '@pages/home/MainPage';
import { Settings } from '@pages/settings/Settings';
import { Search } from '@pages/search/Search';
import { Weekly } from '@pages/weekly/Weekly';
import { Hourly } from '@pages/hourly/Hourly';
import { Sidebar } from '@components/Sidebar';

const App = () => (
  <BrowserRouter>
    <Sidebar />
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/search" component={Search} />
      <Route path="/hourly" component={Hourly} />
      <Route path="/weekly" component={Weekly} />
      <Route path="/" exact component={MainPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
