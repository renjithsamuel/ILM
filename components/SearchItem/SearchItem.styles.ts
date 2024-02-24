import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useSearchItemStyles = makeStyles((theme) => ({
  searchItemRoot: {
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
  bookItemDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    gap: theme.spacing(0.2),
  },
  username: {
    color: themeValues.color.black,
  },
  emailID: {
    color: themeValues.color.black,
    opacity: 0.9,
  },
  bookName: {
    color: themeValues.color.black,
  },
  bookDescription: { color: themeValues.color.black, opacity: 0.9 },
  entityType: {},
  entityChip: {},
}));
