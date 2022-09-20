import { WeatherIcon } from './WeatherIcon';

interface FullscreenLoadingProps {
  loading: boolean;
}

export const FullscreenLoading = ({ loading }: FullscreenLoadingProps) => {
  if (loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 flex justify-center bg-white px-3 pt-40 backdrop-blur dark:bg-zinc-900/90 md:items-center md:pt-0">
      <div className="flex flex-col items-center gap-y-4" role="status">
        <WeatherIcon
          className="animate-spin text-7xl text-yellow-500"
          icon="day-800"
        />
        <span className="text w-64 text-center text-xl font-semibold sm:w-full md:text-2xl">
          Pulling your weather from the cloud...
        </span>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
