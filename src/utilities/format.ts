export const format = {
  celsius: (value: number) => Math.ceil(value - 273.15),
  fahrenheit: (value: number) => Math.ceil((value - 273.15) * 1.8 + 32),
  kelvin: (value: number) => Math.ceil(value),
};
