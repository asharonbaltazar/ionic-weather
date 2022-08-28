import React, { Fragment } from 'react';
import { ButtonWithIcon } from '@components/ButtonWithIcon';

export const SkeletonResults = () => (
  <Fragment>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse bg-slate-400 rounded-sm" />
      </ButtonWithIcon>
    </li>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse bg-slate-400 rounded-sm" />
      </ButtonWithIcon>
    </li>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse bg-slate-400 rounded-sm" />
      </ButtonWithIcon>
    </li>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse bg-slate-400 rounded-sm" />
      </ButtonWithIcon>
    </li>
    <li className="w-full">
      <ButtonWithIcon icon="tabler:map-pin">
        <span className="block h-2 w-4/12 animate-pulse bg-slate-400 rounded-sm" />
      </ButtonWithIcon>
    </li>
  </Fragment>
);
