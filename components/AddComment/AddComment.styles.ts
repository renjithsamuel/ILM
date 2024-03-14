import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useAddCommentStyles = makeStyles((theme) => ({
  addCommentRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    borderRadius: themeValues.border.borderRadius,
    width: "30vw",
    height: "auto",
    position: "relative",
  },
  commentHeading: {
    width: "100%",
  },
  comment: {
    width: "100%",
  },
  commentLabel: {
    alignSelf: "start",
    fontSize: themeValues.font.fontSizeLarge,
    fontWeight: themeValues.font.fontWeightThick,
  },
  commentBtns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  commentBtn: {
    color: themeValues.color.white,
    backgroundColor: themeValues.color.color1,
    "&:hover": {
      color: themeValues.color.white,
      backgroundColor: themeValues.color.color3,
    },
  },
}));
