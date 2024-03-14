import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useTransactionsStyles = makeStyles((theme) => ({
  transactionsRoot: {
    width: "84vw",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    gap: theme.spacing(1),
  },
  sortByContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: theme.spacing(10),
    alignSelf: "start",
    gap: theme.spacing(2),
  },
  searchInputWrap: {
    color: themeValues.color.black,
    borderRadius: themeValues.border.borderRadius,
    backgroundColor: themeValues.color.transparent,
    boxShadow: themeValues.shadow.boxShadowboxy,
    border: themeValues.border.defaultborder,
    borderColor: themeValues.color.transparent,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: theme.spacing(5),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  searchInput: {
    all: "unset",
    color: themeValues.color.black,
    outline: themeValues.color.borderColor2,
    backgroundColor: themeValues.color.transparent,
    transition: themeValues.transition.defaultTansition,
    caretColor: themeValues.color.black,
    fontSize: themeValues.font.fontSizeSmall,
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    "&:hover .searchInputWrap": {
      borderColor: themeValues.color.color2,
      boxShadow: themeValues.shadow.boxShadowHeavy,
    },
    "&::-webkit-input-placeholder": {
      fontSize: themeValues.font.fontSizeSmall,
      color: themeValues.color.black,
      opacity: 1,
    },
  },
  noBooksText: {
    width: "80vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
    marginTop: theme.spacing(20),
    [theme.breakpoints.up("md")]: {
      fontSize: "28px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "25px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "20px",
    },
  },
}));
