import React from 'react';
import { Icon } from '@iconify/react';

export const MainPlaceholder = () => (
  <div className="h-full flex flex-col items-center pt-32 text-gray-900">
    <Icon className="text-7xl text-blue-500" icon="tabler:rainbow" />
    <h1 className="text-3xl font-medium dark:text-stone-200 mt-5">
      Welcome to Ionic Weather
    </h1>
    <div className="mt-3">
      <h3 className="flex items-center text-xl dark:text-stone-200/50">
        To search, tap the
        <Icon className="text-blue-500 mx-1" icon="tabler:search" />
        above
      </h3>
    </div>
  </div>
);
