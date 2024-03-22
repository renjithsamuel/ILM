import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useConnectingToServerDialogStyles = makeStyles((theme) => ({
  loginDialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  progressBarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    backgroundColor: themeValues.color.color1,
    color: themeValues.color.white,
  },
}));
