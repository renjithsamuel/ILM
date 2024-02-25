import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useModifyCountStyles = makeStyles((theme) => ({
  modifyCountRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    padding: theme.spacing(3),
    gap: theme.spacing(1),
    borderRadius: themeValues.border.borderRadius,
    maxWidth: "20vw",
    maxHeight: "25vh",
    position: "relative",
  },
  countBtns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  countBtn: {
    color: themeValues.color.white,
    backgroundColor: themeValues.color.color1,
    "&:hover": {
      color: themeValues.color.white,
      backgroundColor: themeValues.color.color3,
    },
  },
}));
