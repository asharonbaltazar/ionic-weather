import React, { ReactNode } from 'react';
import { LinkWithIcon } from './LinkWithIcon';

interface HeaderWithBackButtonProps {
  title: string;
  backHref?: string;
  rightContent?: ReactNode;
}

export const HeaderWithBackButton = ({
  title,
  backHref = '/',
  rightContent,
}: HeaderWithBackButtonProps) => (
  <header className="flex items-center justify-between p-3 md:p-3 dark:bg-stone-900 shadow-sm dark:shadow-none">
    <div className="flex gap-x-2 items-center">
      <LinkWithIcon to={backHref} icon="tabler:arrow-back-up" />
      <span className="font-medium text text-xl">{title}</span>
    </div>
    {rightContent}
  </header>
);
