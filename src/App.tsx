import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { MainPage } from '@pages/home/MainPage';
import { Settings } from '@pages/settings/Settings';
import { Search } from '@pages/search/Search';
import { Weekly } from '@pages/weekly/Weekly';
import { Hourly } from '@pages/hourly/Hourly';
import { Sidebar } from '@components/Sidebar';

const App = () => (
  <BrowserRouter>
    <Sidebar />
    <Routes>
      <Route path="/settings" element={<Settings />} />
      <Route path="/search" element={<Search />} />
      <Route path="/hourly" element={<Hourly />} />
      <Route path="/weekly" element={<Weekly />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
