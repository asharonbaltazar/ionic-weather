import { Icon } from '@iconify/react';

export const ReloadWeatherButton = () => (
  <button className="text group items-center gap-x-2 rounded font-medium dark:hover:bg-slate-700">
    <Icon
      className="m-1 text-2xl text-blue-500 group-hover:rotate-[360deg] group-hover:transition group-hover:duration-300 group-hover:ease-in-out dark:text-slate-400 md:text-3xl"
      icon="tabler:reload"
    />
  </button>
);
