import { TempPreference } from '@pages/settings/TempPreference';
import { SpeedPreference } from '@pages/settings/SpeedPreference';
import { TimePreference } from '@pages/settings/TimePreference';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';

export const SettingsPage = () => (
  <div className="h-screen">
    <HeaderWithBackButton title="Settings" />

    <div className="mt-4 space-y-6 px-3">
      <div className="flex flex-col gap-y-2">
        <span className="text mb-1 pl-1 text-sm font-medium md:text-xs">
          Weather preferences:
        </span>
        <div className="space-y-2 rounded bg-slate-100 py-2 dark:bg-zinc-800">
          <TempPreference />
          <SpeedPreference />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <span className="text mb-1 pl-1 text-sm font-medium md:text-xs">
          Application preferences:
        </span>
        <div className="space-y-2 rounded bg-slate-100 py-2 dark:bg-zinc-800">
          <TimePreference />
        </div>
      </div>
    </div>
  </div>
);
