import React from 'react';
import { Header } from '@pages/Main/Header';
import { Content } from '@pages/Main/Content';
import { AppShell } from '@mantine/core';

const Main = () => (
  <AppShell header={<Header />} padding={0}>
    <Content />
  </AppShell>
);

export default Main;
