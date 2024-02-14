import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const usePendingUserItemStyles = makeStyles((theme) => ({
  pendingUserItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    borderRadius: themeValues.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowHeavy,
      cursor: "pointer",
    },
  },
  userName: {
    color: themeValues.color.black,
  },
  bookCounts: {
    display: "flex",
    gap: theme.spacing(4),
  },
  eachCount: {
    padding: theme.spacing(0.8),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: themeValues.borderRadiusHigh,
  },
}));
