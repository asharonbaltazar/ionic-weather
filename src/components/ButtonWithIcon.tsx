import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface ButtonWithIconProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  icon: string;
}

export const ButtonWithIcon = ({
  children,
  icon,
  type = 'button',
  ...buttonElementProps
}: ButtonWithIconProps) => (
  <button
    className="text flex w-full items-center gap-x-2 rounded bg-slate-100 p-3 font-medium dark:bg-zinc-800 dark:hover:bg-slate-700 md:p-2.5 "
    type={type}
    {...buttonElementProps}
  >
    <Icon
      className="text-2xl text-blue-500 dark:text-slate-400 md:text-3xl"
      icon={icon}
    />
    {children}
  </button>
);
