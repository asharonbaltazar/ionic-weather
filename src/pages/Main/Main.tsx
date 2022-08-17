import React from 'react';
import { Header } from 'src/pages/Main/Header';
import { Content } from 'src/pages/Main/Content';
import { AppShell } from '@mantine/core';

const Main = () => (
  <AppShell header={<Header />} padding={0}>
    <Content />
  </AppShell>
);

export default Main;
