import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useBookGridItemStyles = makeStyles((theme) => ({
  bookItemContainer: {
    height: "100%",
    minWidth: 'min-content',
    padding: theme.spacing(2),
    backgroundColor: themeValues.color.color4,
    borderRadius: themeValues.borderRadiusHigh,
    // border: themeValues.defaultborder,
    boxShadow: themeValues.shadow.boxShadowLight,
    color: themeValues.color.color1,
    transition: themeValues.transition.defaultTansition,
    animation: "slide-up 0.4s ease",
    "&:hover": {
      // backgroundColor: themeValues.color.lightGray,
      // filter: themeValues.defaultFilterShadow,
      boxShadow: themeValues.shadow.boxShadowHeavy,
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
    marginTop: theme.spacing(2),
  },
  keyValueContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookItemKey: {
    fontWeight: themeValues.font.fontWeightThick,
    fontSize: themeValues.spacing(1.8),
  },
  bookItemValue: {
    textIndent: theme.spacing(1),
    fontSize: themeValues.spacing(1.8),
  },
  bookDescription: {
    flexDirection: "column",
    alignItems: "start",
    gap: theme.spacing(1),
  },
}));
