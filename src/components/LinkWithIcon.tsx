import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface LinkWithIconProps extends NavLinkProps {
  icon: string;
}

export const LinkWithIcon = ({
  icon,
  className,
  ...linkProps
}: LinkWithIconProps) => (
  <NavLink
    {...linkProps}
    className={({ isActive }) =>
      clsx(
        'text flex w-full items-center gap-x-2 rounded p-1 font-medium dark:hover:bg-slate-700',
        {
          'bg-blue-500/90 dark:hover:bg-blue-600/50': isActive,
        },
        className
      )
    }
    end
  >
    {({ isActive }) => (
      <Icon
        className={clsx('text-2xl  md:text-3xl', {
          'text-stone-200': isActive,
          'text-blue-500 dark:text-slate-400': !isActive,
        })}
        icon={icon}
      />
    )}
  </NavLink>
);
