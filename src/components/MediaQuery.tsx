import { Fragment, ReactNode } from 'react';
import { useMediaQuery } from '@mantine/hooks';

interface MediaQueryProps {
  children: ReactNode;
  mediaQuery?: string;
  invert?: boolean;
}

export const MediaQuery = ({
  // https://tailwindcss.com/docs/responsive-design
  mediaQuery = '(min-width: 1024px)',
  children,
  invert = false,
}: MediaQueryProps) => {
  const hasReachedMediaQuery = useMediaQuery(mediaQuery);

  if (!hasReachedMediaQuery) {
    if (invert) {
      return <Fragment>{children}</Fragment>;
    }

    return null;
  }

  if (invert) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};
