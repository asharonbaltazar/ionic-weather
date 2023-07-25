export const GoogleAttribution = () => (
  <picture className="mt-3 self-end pb-3 pr-3">
    <img
      className="h-6 w-36 object-contain"
      src="assets/google_dark.png"
      alt="google logo"
    />
    <img
      className="h-6 w-36 object-contain dark:hidden"
      src="assets/google_light.png"
      alt="google logo"
    />
  </picture>
);
