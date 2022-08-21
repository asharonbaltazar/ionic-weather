import React from 'react';
import { Header } from '@pages/Main/Header';
import { Content } from '@pages/Main/Content';
import { AppShell } from '@mantine/core';
import { SearchDrawer } from '@pages/SearchDrawer';
import { State } from '@components/State';

export const Main = () => (
  <State state={false}>
    {([drawerState, setDrawerState]) => (
      <AppShell
        header={<Header setDrawerState={setDrawerState} />}
        padding={0}
        className="bg-white"
      >
        <SearchDrawer
          drawerState={drawerState}
          setDrawerState={setDrawerState}
        />
        <Content />
      </AppShell>
    )}
  </State>
);
