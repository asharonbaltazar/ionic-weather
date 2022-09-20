import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { MainPage } from '@pages/main/MainPage';
import { SettingsPage } from '@pages/settings/SettingsPage';
import { SearchPage } from '@pages/search/SearchPage';
import { WeeklyPage } from '@pages/weekly/WeeklyPage';
import { HourlyPage } from '@pages/hourly/HourlyPage';
import { Sidebar } from '@components/Sidebar';

const App = () => (
  <BrowserRouter>
    <Sidebar />
    <Switch>
      <Route path="/settings" component={SettingsPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/hourly" component={HourlyPage} />
      <Route path="/weekly" component={WeeklyPage} />
      <Route path="/" exact component={MainPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
