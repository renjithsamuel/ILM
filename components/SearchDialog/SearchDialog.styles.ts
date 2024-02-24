import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useSearchDialogStyles = makeStyles((theme) => ({
  searchDialogContentRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    padding: theme.spacing(2),
    gap: theme.spacing(1),
    width: "38vw",
    height: "70vh",
  },
  searchInputWrap: {
    width: "95%",
    color: themeValues.color.black,
    borderRadius: theme.spacing(0.5),
    backgroundColor: themeValues.color.lightGray,
    boxShadow: themeValues.shadow.boxShadowboxy,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  searchInput: {
    all: "unset",
    width: "100%",
    color: themeValues.color.black,
    outline: themeValues.color.borderColor2,
    backgroundColor: themeValues.color.lightGray,
    transition: themeValues.transition.defaultTansition,
    caretColor: themeValues.color.black,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    "&:focus": {},
    "&::-webkit-input-placeholder": {
      color: themeValues.color.black,
      opacity: 1,
    },
  },
  sortByContainer: {
    display: "flex",
    alignSelf: "center",
    gap: theme.spacing(0.5),
  },
}));
