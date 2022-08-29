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
    className="text flex w-full items-center justify-between rounded-3xl bg-slate-100 p-3 font-medium dark:bg-zinc-800 dark:hover:bg-slate-700 md:p-2.5 "
    type={type}
    {...linkProps}
  >
    <span className="flex items-center gap-x-2">
      <Icon
        className="text-2xl text-blue-500 dark:text-slate-400 md:text-3xl"
        icon={icon}
      />
      {children}
    </span>

    <Icon
      className="text-2xl text-blue-500 dark:text-slate-400 md:text-3xl"
      icon="tabler:arrow-up-right"
    />
  </Link>
);
