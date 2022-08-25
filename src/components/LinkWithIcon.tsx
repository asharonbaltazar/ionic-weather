import React from 'react';
import { Icon } from '@iconify/react';
import { Link, LinkProps } from 'react-router-dom';

interface LinkWithIconProps extends LinkProps {
  icon: string;
}

export const LinkWithIcon = ({ icon, ...linkProps }: LinkWithIconProps) => (
  <Link
    {...linkProps}
    className="p-1 flex items-center gap-x-2 w-full dark:hover:bg-slate-700 font-medium text rounded"
  >
    <Icon
      className="text-2xl md:text-3xl text-blue-500 dark:text-slate-400"
      icon={icon}
    />
  </Link>
);
