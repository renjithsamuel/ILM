import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useAllBooksStyles = makeStyles((theme) => ({
  allBooksRoot: {
    width: "84vw",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  booksContainer: {
    width: "80vw",
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  sortByContainer: {
    display: "flex",
    width: "25vw",
    alignSelf: "start",
    gap: theme.spacing(2),
  },
  noBooksText: {
    width: "80vw",
    marginTop: theme.spacing(20),
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
}));
