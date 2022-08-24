import React from 'react';

import lightLogo from 'src/assets/google_light.png';
import darkLogo from 'src/assets/google_dark.png';

export const GoogleAttribution = () => (
  <picture className="self-end pb-3">
    <source srcSet={darkLogo} media="(prefers-color-scheme: dark)" />
    <img
      className="h-6 w-36 object-contain"
      src={lightLogo}
      alt="google logo"
    />
  </picture>
);
