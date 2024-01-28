import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useBookGridItemStyles = makeStyles((theme) => ({
  bookItemContainer: {
    padding: theme.spacing(1.4),
    backgroundColor: themeValues.color.color4,
    borderRadius: themeValues.borderRadius,
    border: themeValues.defaultborder,
    color: themeValues.color.color1,
    transition: themeValues.defaultTansition,
    animation: "slide-up 0.4s ease",
    "&:hover": {
      backgroundColor: themeValues.color.lightGray,
      filter: themeValues.defaultFilterShadow,
      cursor: "pointer",
    },
  },
  bookImageWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
    marginBottom: theme.spacing(2),
  },
  bookImage: {
    borderRadius: themeValues.borderRadius,
  },
  bookContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  keyValueContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookItemKey: {
    fontWeight: themeValues.font.fontWeightThick,
  },
  bookItemValue: {},
  bookDescription: {
    flexDirection: "column",
    alignItems: "start",
    gap: theme.spacing(1),
  },
}));
