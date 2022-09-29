import clsx from 'clsx';
import { ReactNode } from 'react';

interface BadgeProps {
  bgColor?: string;
  textColor?: string;
  children: ReactNode;
}

export const Badge = ({
  bgColor = 'bg-blue-200',
  textColor = 'text-gray-100',
  children,
}: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-medium',
      bgColor,
      textColor
    )}
  >
    {children}
  </span>
);
