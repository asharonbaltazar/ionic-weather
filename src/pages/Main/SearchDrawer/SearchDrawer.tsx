import React from 'react';
import { ActionIcon, Drawer } from '@mantine/core';
import { Icon } from '@iconify/react';
import { LocationInput } from '@pages/Main/SearchDrawer/LocationInput';
import { LocationResults } from '@pages/Main/SearchDrawer/LocationResults';
import { GoogleAttribution } from '@pages/Main/SearchDrawer/GoogleAttribution';

interface SearchDrawerProps {
  drawerState: boolean;
  setDrawerState: (newState: boolean) => void;
}

export const SearchDrawer = ({
  drawerState,
  setDrawerState,
}: SearchDrawerProps) => (
  <Drawer
    className="h-full px-3 m-0 flex flex-col"
    opened={drawerState}
    onClose={() => setDrawerState(false)}
    position="top"
    withCloseButton={false}
  >
    <ActionIcon
      className="absolute top-0 right-0 m-3"
      onClick={() => setDrawerState(false)}
    >
      <Icon className="text-3xl" icon="tabler:x" />
    </ActionIcon>

    <LocationInput />
    <LocationResults />
    <GoogleAttribution />
  </Drawer>
);
