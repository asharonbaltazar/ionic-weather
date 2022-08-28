import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export const Badge = ({ children }: BadgeProps) => (
  <span className="inline-flex items-center px-2 py-1.5 rounded-lg text-xs font-medium bg-blue-200 text-blue-800">
    {children}
  </span>
);
