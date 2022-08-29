import { Icon } from '@iconify/react';

export const MainPlaceholder = () => (
  <div className="flex h-full flex-col items-center pt-32">
    <Icon className="text-7xl text-blue-500" icon="tabler:rainbow" />
    <h1 className="text mt-5 text-3xl font-medium">Welcome to Ionic Weather</h1>
    <div className="mt-3">
      <h3 className="flex items-center text-xl dark:text-stone-200/50">
        To search, tap the
        <Icon className="mx-1 text-blue-500" icon="tabler:search" />
        above
      </h3>
    </div>
  </div>
);
