import React from 'react';

import lightLogo from 'src/assets/google_light.png';
import darkLogo from 'src/assets/google_dark.png';

export const GoogleAttribution = () => (
  <picture className="self-end mt-3 pb-3 pr-3">
    <img className="h-6 w-36 object-contain" src={darkLogo} alt="google logo" />
    <img
      className="h-6 w-36 object-contain dark:hidden"
      src={lightLogo}
      alt="google logo"
    />
  </picture>
);
