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
  },
  sortByContainer: {
    display: "flex",
    width: "25vw",
    alignSelf: "center",
    gap: theme.spacing(2),
  },
}));
