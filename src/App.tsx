import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import Main from '@pages/Main/Main';
import SettingsModal from '@pages/Settings';
import SearchModal from '@pages/Search';
import { AppProvider as ContextProvider } from '@context/app-context';

const App = () => (
  <BrowserRouter>
    <ContextProvider>
      <MantineProvider withNormalizeCSS>
        <Route path="/search" component={SearchModal} />
        <Route path="/settings" component={SettingsModal} />
        <Route path="/" exact component={Main} />
      </MantineProvider>
    </ContextProvider>
  </BrowserRouter>
);

export default App;
