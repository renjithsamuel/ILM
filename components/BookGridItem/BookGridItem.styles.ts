import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useBookGridItemStyles = makeStyles((theme) => ({
  bookItemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    flexDirection: "column",
    height: "100%",
    minWidth: "min-content",
    padding: theme.spacing(2),
    backgroundColor: themeValues.color.color4,
    borderRadius: themeValues.border.borderRadiusHigh,
    // border: themeValues.defaultborder,
    boxShadow: themeValues.shadow.boxShadowLight,
    color: themeValues.color.color1,
    transition: themeValues.transition.defaultTansition,
    animation: themeValues.animation.slideUp,
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
    borderRadius: themeValues.border.borderRadius,
  },
  bookCounts: {
    display: "flex",
    alignSelf: "center",
    gap: theme.spacing(2),
  },
  bookCount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    borderRadius: themeValues.border.borderRadius,
    border: themeValues.border.defaultborderGrey,
    "&:hover": {
      cursor: "pointer",
    },
  },
  bookRating: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
  bookContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
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
