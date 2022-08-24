import React from 'react';
import { TempPreference } from '@components/settings_toggles/TempPreference';
import { SpeedPreference } from '@components/settings_toggles/SpeedPreference';
import { TimePreference } from '@components/settings_toggles/TimePreference';
import { ActionIcon, Header } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const SettingsModal = () => (
  <div className="bg-white">
    <Header className="flex items-center p-3 gap-x-2" height="auto">
      <ActionIcon component={Link} to="/">
        <Icon className="text-3xl text-gray-900" icon="tabler:arrow-back-up" />
      </ActionIcon>
      <span className="text-gray-900 font-medium">Settings</span>
    </Header>

    <div>
      <span>Weather preferences: </span>
      <TempPreference />
      <SpeedPreference />
    </div>

    <div>
      <span>Application preferences: </span>
      <TimePreference />
    </div>
  </div>
);

export default SettingsModal;
