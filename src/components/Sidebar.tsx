import { MediaQuery } from '@components/MediaQuery';
import { LinkWithIcon } from '@components/LinkWithIcon';

export const Sidebar = () => (
  <MediaQuery>
    <aside className="row-span-2 flex flex-col items-center justify-between rounded-l-xl p-3 lg:bg-white lg:dark:bg-stone-900">
      <div>
        <LinkWithIcon to="/search" icon="tabler:search" />
      </div>

      <LinkWithIcon to="/settings" icon="tabler:settings" />
    </aside>
  </MediaQuery>
);
