import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export const Badge = ({ children }: BadgeProps) => (
  <span className="inline-flex items-center rounded-lg bg-blue-200 px-2 py-1.5 text-xs font-medium text-blue-800">
    {children}
  </span>
);
