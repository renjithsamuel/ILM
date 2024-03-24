import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useBookShelfStyles = makeStyles((theme) => ({
  booksContainerRoot: {
    padding: theme.spacing(2),
  },
  booksContainer: {
    // backgroundColor: "red",
    width: "80vw",
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  noBooksText: {
    width: "80vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
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
  bookShelfTexts: {
    fontSize: theme.spacing(3),
    color: themeValues.color.color1,
    fontWeight: themeValues.font.fontWeightThick,
    marginBottom: theme.spacing(1),
  },
  paginationWrap: {
    width: "80vw",
    position: "sticky",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
