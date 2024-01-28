import {
  ThemeOptions,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

const customThemeOptions = {
  palette: {
    text: {
      primary: "#000000",
    },
    primary: {
      main: "#000000",
      "50": "#FAFAFA",
      "100": "#F5F5F5",
      "200": "#EEEEEE",
      "300": "#E0E0E0",
      "400": "#BDBDBD",
      "500": "#9E9E9E",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      light: "#FFFFFF",
    },
    secondary: {
      main: "#002F6C",
      "50": "#E3F2FD",
      "100": "#BBDEFB",
      "200": "#8FCAF9",
      "300": "#63B4F6",
      "400": "#40A4F5",
      "500": "#1F94F3",
      "600": "#1D85E5",
      "700": "#1A73D2",
      "800": "#1763C0",
      "900": "#1045A1",
    },
    error: {
      main: "#D33D3D",
      dark: "#B00020",
    },
    background: {
      default: "#E5E5E5",
    },
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
    divider: "#E0E0E0",
    success: {
      main: "#00796B",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "Roboto", "sans-serif"].join(","),
    h1: {
      fontFamily: "Open Sans",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "6rem",
    },
    h2: {
      fontFamily: "Open Sans",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "3.75rem",
    },
    h3: {
      fontFamily: "Open Sans",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "3rem",
    },
    h4: {
      fontFamily: "Open Sans",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "2.25rem",
    },
    h5: {
      fontFamily: "Open Sans",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "1.5rem",
    },
    h6: {
      fontFamily: "Open Sans",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "1.25rem",
    },
    subtitle1: {
      fontFamily: "Roboto",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "1rem",
    },
    subtitle2: {
      fontFamily: "Roboto",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "0.875rem",
    },
    body1: {
      fontFamily: "Roboto",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "Roboto",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "0.875rem",
    },
    caption: {
      fontFamily: "Roboto",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "0.75rem",
    },
    button: {
      fontFamily: "Roboto",
      fallbacks: [{ fontFamily: "sans-serif" }],
      fontSize: "0.875rem",
    },
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#1D85E5",
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#1D85E5",
        "&:hover": {
          backgroundColor: "#1D85E5",
        },
      },
      current: {
        color: "#00796B",
      },
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  borderRadius: {
    low: "5px",
    mid: "6px",
    high: "10px",
  },
} as ThemeOptions;

const theme = createTheme(customThemeOptions);

export default responsiveFontSizes(theme);
