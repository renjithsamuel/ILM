import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useLoginDialogStyles = makeStyles((theme) => ({
  loginDialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    animation: themeValues.animation.slideUp,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "pointer",
    },
  },
  loginWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "30vw",
    padding: theme.spacing(4),
    gap: theme.spacing(3),
    color: themeValues.color.color1,
  },
  textField: {
    marginTop: theme.spacing(2),
    width: "100%",
    textAlign: "left",
  },
  loginButton: {
    marginTop: theme.spacing(2),
    alignSelf: "center",
    color: themeValues.color.textColor,
    backgroundColor: themeValues.color.color1,
    "&:hover": {
      backgroundColor: themeValues.color.color3,
    },
  },
  switcher: {
    color: themeValues.color.color1,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));
