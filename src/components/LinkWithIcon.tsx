import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

interface LinkWithIconProps extends LinkProps {
  icon: string;
}

export const LinkWithIcon = ({
  icon,
  className,
  ...linkProps
}: LinkWithIconProps) => (
  <Link
    {...linkProps}
    className={clsx(
      'text flex w-full items-center gap-x-2 rounded p-1 font-medium dark:hover:bg-slate-700',
      className
    )}
  >
    <Icon
      className="text-2xl text-blue-500 dark:text-slate-400 md:text-3xl"
      icon={icon}
    />
  </Link>
);
