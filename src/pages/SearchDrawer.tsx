import React from 'react';
import Searchbar from '@components/Searchbar';
import SearchContent from '@components/SearchContent';
import lightLogo from 'src/assets/google_light.png';
import darkLogo from 'src/assets/google_dark.png';
import { ActionIcon, Drawer } from '@mantine/core';
import { Icon } from '@iconify/react';

interface SearchDrawerProps {
  drawerState: boolean;
  setDrawerState: (newState: boolean) => void;
}

export const SearchDrawer = ({
  drawerState,
  setDrawerState,
}: SearchDrawerProps) => {
  const onSearchDrawerClose = () => setDrawerState(false);

  return (
    <Drawer
      className="h-full px-3"
      opened={drawerState}
      onClose={onSearchDrawerClose}
      position="top"
      title={
        <h1 className="text-3xl text-gray-900 pt-16 font-medium">
          Search Locations
        </h1>
      }
      withCloseButton={false}
    >
      <ActionIcon
        className="absolute top-0 right-0 m-3"
        onClick={onSearchDrawerClose}
      >
        <Icon icon="tabler:x" />
      </ActionIcon>
      <Searchbar />
      <SearchContent />
      <picture>
        <source srcSet={darkLogo} media="(prefers-color-scheme: dark)" />
        <img
          className="h-6 w-36 object-contain"
          src={lightLogo}
          alt="google logo"
        />
      </picture>
    </Drawer>
  );
};
