export const themeValues = {
  border: {
    borderRadius: "6px",
    borderRadiusHigh: "10px",
    borderRadiusLow: "4px",
    defaultborder: "1px solid black",
    thickborder: "3px solid black",
    defaultborderGrey: "1px solid #D3D3D3",
  },
  color: {
    color1: "#0c2465",
    color2: "#a2b0d6",
    color3: "#60679b",
    color4: "#ffffff",
    textColor: "#ffffff",
    borderColor1: "#000000",
    borderColor2: "#ffffff",
    white: "#ffffff",
    black: "#000000",
    lightGray: "#f1f1f1",
    rubyRed: "#8B0000",
    rubyRedDark: "#BA0021",
    transparent: "transparent",
  },
  font: {
    fontWeightThick: "700",
    fontWeightLightThick: "600",
    fontSizeXLarge: "x-large",
    fontSizeLarge: "large",
    fontSizeSmall: "small",
    fontSizeMedium: "medium",
  },
  shadow: {
    vignetteEffectBackground : 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
    boxShadowLight: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    boxShadowHeavy:
      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
    boxShadowLightWhite: "#ededed 0px 8px 24px",
    FilterShadowDefault: "drop-shadow(1px 2px 4px gray)",
    boxShadowAttatched:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    boxShadowBookHover:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    boxShadowboxy:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    boxShadowboxyWhite:
      "rgba(255, 255, 255, 0.8) 0px 6px 24px 0px, rgba(255, 255, 255, 0.8) 0px 0px 0px 1px",
  },
  spacing: (value: number) => `${value * 8}px`,
  transition: {
    defaultTansition: "0.3s ease all",
    longTransition: "1s ease all",
  },
  gradient: {
    color1:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
  },
  oneByThree: "33.33%",
  sideNavWidth: "12%",
};
