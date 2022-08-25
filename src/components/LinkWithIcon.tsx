import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface LinkWithIconProps {
  href: string;
  icon: string;
}

export const LinkWithIcon = ({ href, icon }: LinkWithIconProps) => (
  <Link
    to={href}
    className="p-1 flex items-center gap-x-2 w-full dark:hover:bg-slate-700 font-medium dark:text-stone-200 rounded"
  >
    <Icon
      className="text-2xl md:text-3xl text-blue-500 dark:text-slate-400"
      icon={icon}
    />
  </Link>
);
