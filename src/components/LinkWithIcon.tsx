import { Icon } from '@iconify/react';
import { Link, LinkProps } from 'react-router-dom';

interface LinkWithIconProps extends LinkProps {
  icon: string;
}

export const LinkWithIcon = ({ icon, ...linkProps }: LinkWithIconProps) => (
  <Link
    {...linkProps}
    className="text flex w-full items-center gap-x-2 rounded p-1 font-medium dark:hover:bg-slate-700"
  >
    <Icon
      className="text-2xl text-blue-500 dark:text-slate-400 md:text-3xl"
      icon={icon}
    />
  </Link>
);
