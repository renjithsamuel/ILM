import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useSingleUserStyles = makeStyles((theme) => ({
  singleUserRoot: {
    width: "85vw",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(3),
    padding: theme.spacing(2),
  },
  userCover: {
    width: "75vw",
    height: "25vh",

    borderRadius: themeValues.borderRadiusLow,
    zIndex: 0,

    backgroundColor: "blue",
  },
  userImage: {
    width: "10vw",
    height: "20vh",
    position: "relative",
    left: -25,
    top: 40,
    zIndex: 1,
    boxShadow: themeValues.shadow.boxShadowHeavy,
    borderRadius: themeValues.borderRadiusLow,

    backgroundColor: "red",
  },
  userDetailsContainer: {
    width: "20vw",
    height: "25vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: themeValues.shadow.boxShadowLight,
    borderRadius: themeValues.borderRadiusHigh,

    // backgroundColor: "red",
  },
  userDetailBox: {
    display: "flex",
    alignSelf: "center",
    gap: theme.spacing(3),
    padding: theme.spacing(2),
  },
  userDetailKey: {
    fontWeight: themeValues.font.fontWeightLightThick,
    fontSize: themeValues.spacing(2),
    alignSelf: "start",
  },
  userDetailValue: {},
  bookDetailsContainer: {
    width: "80vw",
    height: "25vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
  },
  bookDetailBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: themeValues.borderRadiusHigh,
    transition: themeValues.transition.defaultTansition,
    boxShadow: themeValues.shadow.boxShadowboxy,
    color: themeValues.color.color1,
    "&:hover": {
      backgroundColor: themeValues.color.color1,
      color: themeValues.color.textColor,
      boxShadow: themeValues.shadow.boxShadowHeavy,
      cursor: "pointer",
    },
  },
  bookDetailKey: {
    fontWeight: themeValues.font.fontWeightLightThick,
    fontSize: themeValues.spacing(2),
    alignSelf: "start",
  },
  bookDetailValue: {},
}));
