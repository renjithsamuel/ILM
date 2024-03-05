import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useDashboardLineGraphStyles = makeStyles((theme) => ({
  dashboardLineGraph: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "pointer",
    },
  },
}));
