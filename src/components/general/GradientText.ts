export const gradientText = (linearGradientCss) => `
  background: ${linearGradientCss};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
