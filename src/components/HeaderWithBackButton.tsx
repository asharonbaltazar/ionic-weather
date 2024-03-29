import { ReactNode } from 'react';
import { LinkWithIcon } from '@components/LinkWithIcon';

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
  <header className="sticky inset-y-0 z-10 flex items-center justify-between bg-white p-3 shadow-sm dark:bg-stone-900 dark:shadow-none md:p-3">
    <div className="flex items-center gap-x-2">
      <LinkWithIcon to={backHref} icon="tabler:arrow-back-up" title="Back" />
      <span className="text text-xl font-medium">{title}</span>
    </div>
    {rightContent}
  </header>
);
