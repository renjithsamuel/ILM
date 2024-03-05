import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useSettingsStyles = makeStyles((theme) => ({
  settingsRoot: {
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
    borderRadius: themeValues.border.borderRadiusLow,
    zIndex: 0,
    backgroundColor: themeValues.color.color1,
  },
  userImage: {
    width: "10vw",
    height: "20vh",
    position: "relative",
    left: -25,
    top: 40,
    zIndex: 1,
    boxShadow: themeValues.shadow.boxShadowAttatched,
    borderRadius: themeValues.border.borderRadiusLow,
    backgroundColor: themeValues.color.color2,
  },
  settingsItemRoot: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    gap: theme.spacing(1),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "pointer",
    },
  },
  settingsItemDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    gap: theme.spacing(0.2),
  },
  settingsItemName: {
    color: themeValues.color.black,
  },
  settingsItemDescription: {
    color: themeValues.color.black,
    opacity: 0.9,
  },
  ButtonWrap: {},
  ActionButton: {
    color: themeValues.color.white,
    backgroundColor: themeValues.color.color1,
    "&:hover": {
      backgroundColor: themeValues.color.color3,
      boxShadow: themeValues.shadow.boxShadowAttatched,
    },
  },
}));
