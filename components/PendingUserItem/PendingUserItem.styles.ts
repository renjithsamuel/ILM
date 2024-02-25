import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const usePendingUserItemStyles = makeStyles((theme) => ({
  pendingUserItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "pointer",
    },
  },
  userName: {
    color: themeValues.color.color1,
  },
  bookCounts: {
    display: "flex",
    gap: theme.spacing(4),
  },
  eachCount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0.8),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: themeValues.border.borderRadiusHigh,
    gap: theme.spacing(2),
    transition: themeValues.transition.defaultTansition,
  },
  labelName: {
    fontSize: themeValues.font.fontSizeMedium,
  },
}));
