import { Fragment, ReactNode } from 'react';
import { useMediaQuery } from '@mantine/hooks';
// Disabling because rule is incorrect
// eslint-disable-next-line import/no-extraneous-dependencies
import defaultTheme from 'tailwindcss/defaultTheme';

type MediaQueryWithInvert = {
  // https://tailwindcss.com/docs/responsive-design
  breakpoint?: keyof typeof defaultTheme.screens;
  show?: boolean;
  children: ReactNode;
};

interface MediaQueryWithRenderProps {
  breakpoint?: keyof typeof defaultTheme.screens;
  children(matches: boolean): JSX.Element;
}

type MediaQueryProps = MediaQueryWithInvert | MediaQueryWithRenderProps;

export const MediaQuery = ({
  breakpoint = 'lg',
  children,
  ...props
}: MediaQueryProps) => {
  const hasReachedMediaQuery = useMediaQuery(
    `(min-width: ${defaultTheme.screens[breakpoint]})`
  );

  if (typeof children === 'function') {
    return children(hasReachedMediaQuery);
  }

  if (hasReachedMediaQuery) {
    if ('show' in props && props.show) {
      return null;
    }

    return <Fragment>{children}</Fragment>;
  }

  if ('show' in props && props.show) {
    return <Fragment>{children}</Fragment>;
  }

  return null;
};
