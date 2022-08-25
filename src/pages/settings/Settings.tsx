import React from 'react';
import { TempPreference } from '@pages/settings/TempPreference';
import { SpeedPreference } from '@pages/settings/SpeedPreference';
import { TimePreference } from '@pages/settings/TimePreference';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';

export const Settings = () => (
  <div className="h-screen">
    <HeaderWithBackButton title="Settings" />

    <div className="space-y-6 px-3 mt-4">
      <div className="flex flex-col gap-y-2">
        <span className="text-gray-900 dark:text-stone-300 font-medium text-sm md:text-xs mb-1 pl-1">
          Weather preferences:
        </span>
        <div className="bg-slate-100 dark:bg-zinc-800 space-y-2 py-2 rounded">
          <TempPreference />
          <SpeedPreference />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <span className="text-gray-900 dark:text-stone-300 font-medium text-sm md:text-xs mb-1 pl-1">
          Application preferences:
        </span>
        <div className="bg-slate-100 dark:bg-zinc-800 space-y-2 py-2 rounded">
          <TimePreference />
        </div>
      </div>
    </div>
  </div>
);
