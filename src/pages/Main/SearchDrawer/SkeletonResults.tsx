import React from 'react';
import { Icon } from '@iconify/react';
import { Skeleton } from '@mantine/core';

export const SkeletonResults = () => (
  <ul className="space-y-3">
    <li className="flex items-center gap-x-1">
      <Icon className="text-3xl text-blue-500" icon="tabler:map-pin" />
      <div className="w-full space-y-1">
        <Skeleton className="h-2 w-9/12" />
        <Skeleton className="h-2 w-5/12" />
      </div>
    </li>
    <li className="flex items-center gap-x-1">
      <Icon className="text-3xl text-blue-500" icon="tabler:map-pin" />
      <div className="w-full space-y-1">
        <Skeleton className="h-2 w-9/12" />
        <Skeleton className="h-2 w-5/12" />
      </div>
    </li>
    <li className="flex items-center gap-x-1">
      <Icon className="text-3xl text-blue-500" icon="tabler:map-pin" />
      <div className="w-full space-y-1">
        <Skeleton className="h-2 w-9/12" />
        <Skeleton className="h-2 w-5/12" />
      </div>
    </li>
    <li className="flex items-center gap-x-1">
      <Icon className="text-3xl text-blue-500" icon="tabler:map-pin" />
      <div className="w-full space-y-1">
        <Skeleton className="h-2 w-9/12" />
        <Skeleton className="h-2 w-5/12" />
      </div>
    </li>
    <li className="flex items-center gap-x-1">
      <Icon className="text-3xl text-blue-500" icon="tabler:map-pin" />
      <div className="w-full space-y-1">
        <Skeleton className="h-2 w-9/12" />
        <Skeleton className="h-2 w-5/12" />
      </div>
    </li>
  </ul>
);
