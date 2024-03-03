import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useDashboardStyles = makeStyles((theme) => ({
  dashboardRoot: {
    width: "82vw",
    display: "flex",
    alignItems: "start",
    gap: theme.spacing(3),
    justifyContent: "start",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  dashboardLeft: {
    width: "90%",
    display: "flex",
    gap: theme.spacing(3),
    flexDirection: "column",
    alignItems: "center",
  },
  lineGraphWrap: {
    height: "auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    padding: theme.spacing(3),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "default",
    },
  },
  dashboardDataBoard: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    userSelect: "none",
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "default",
    },
  },
  dashboardRight: {
    width: "25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    color: themeValues.color.color1,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "pointer",
    },
  },
}));