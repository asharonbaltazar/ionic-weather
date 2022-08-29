import { Fragment } from 'react';
import { ButtonWithIcon } from '@components/ButtonWithIcon';

export const SkeletonResults = () => (
  <Fragment>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse rounded-sm bg-slate-400" />
      </ButtonWithIcon>
    </li>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse rounded-sm bg-slate-400" />
      </ButtonWithIcon>
    </li>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse rounded-sm bg-slate-400" />
      </ButtonWithIcon>
    </li>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse rounded-sm bg-slate-400" />
      </ButtonWithIcon>
    </li>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse rounded-sm bg-slate-400" />
      </ButtonWithIcon>
    </li>
  </Fragment>
);
