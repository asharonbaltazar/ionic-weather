import React, { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { Link, LinkProps } from 'react-router-dom';

interface LinkButtonWithIconProps extends Omit<LinkProps, 'className'> {
  children: ReactNode;
  icon: string;
}

export const LinkButtonWithIcon = ({
  icon,
  children,
  type = 'button',
  ...linkProps
}: LinkButtonWithIconProps) => (
  <Link
    className="p-3 md:p-2.5 flex items-center justify-between w-full dark:hover:bg-slate-700 font-medium text rounded-3xl bg-slate-100 dark:bg-zinc-800 "
    type={type}
    {...linkProps}
  >
    <span className="flex items-center gap-x-2">
      <Icon
        className="text-2xl md:text-3xl text-blue-500 dark:text-slate-400"
        icon={icon}
      />
      {children}
    </span>

    <Icon
      className="text-2xl md:text-3xl text-blue-500 dark:text-slate-400"
      icon="tabler:arrow-up-right"
    />
  </Link>
);
