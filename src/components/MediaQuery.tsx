import { useMediaQuery } from '@mantine/hooks';
import { Fragment, ReactNode } from 'react';

interface MediaQueryProps {
  children: ReactNode;
  mediaQuery?: string;
}

export const MediaQuery = ({
  // https://tailwindcss.com/docs/responsive-design
  mediaQuery = '(min-width: 1024px)',
  children,
}: MediaQueryProps) => {
  const isBig = useMediaQuery(mediaQuery);

  if (!isBig) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};
