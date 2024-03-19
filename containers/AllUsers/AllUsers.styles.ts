import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useAllUsersStyles = makeStyles((theme) => ({
  allUsersRoot: {
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
    alignSelf: "start",
    gap: theme.spacing(2),
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
