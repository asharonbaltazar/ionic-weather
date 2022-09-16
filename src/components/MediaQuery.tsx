import { Fragment, ReactNode } from 'react';
import { useMediaQuery } from '@mantine/hooks';
// Disabling because rule is incorrect
// eslint-disable-next-line import/no-extraneous-dependencies
import defaultTheme from 'tailwindcss/defaultTheme';
// https://tailwindcss.com/docs/responsive-design

interface MediaQueryWithInvert {
  mediaQuery?: keyof typeof defaultTheme.screens;
  invert?: boolean;
  children: ReactNode;
}

interface MediaQueryWithRenderProps {
  mediaQuery?: keyof typeof defaultTheme.screens;
  children(matches: boolean): JSX.Element;
}

type MediaQueryProps = MediaQueryWithInvert | MediaQueryWithRenderProps;

export const MediaQuery = ({
  mediaQuery = 'lg',
  children,
  ...props
}: MediaQueryProps) => {
  const hasReachedMediaQuery = useMediaQuery(
    `(min-width: ${defaultTheme.screens[mediaQuery]})`
  );

  if (typeof children === 'function') {
    return children(hasReachedMediaQuery);
  }

  if (!hasReachedMediaQuery) {
    if ('invert' in props) {
      return <Fragment>{children}</Fragment>;
    }

    return null;
  }

  if ('invert' in props) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};
