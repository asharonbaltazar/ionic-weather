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
    className="py-3 px-2 flex items-center gap-x-2 w-full dark:hover:bg-slate-700 font-medium dark:text-stone-200 rounded bg-slate-100 dark:bg-zinc-800 text-gray-900"
    type={type}
    {...buttonElementProps}
  >
    <Icon
      className="text-2xl md:text-3xl text-blue-500 dark:text-slate-400"
      icon={icon}
    />
    {children}
  </button>
);
