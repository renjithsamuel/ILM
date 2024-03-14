import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useCommentItemStyles = makeStyles((theme) => ({
  commentItemRoot: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    gap: theme.spacing(3),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    animation: themeValues.animation.slideUp,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "pointer",
    },
  },
  userImageWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
  },
  userImage: {
    border: themeValues.border.defaultborder,
    borderRadius: "50%",
    objectFit: "cover",
    opacity: 0.8,
    backgroundColor: themeValues.color.color1,
    color: themeValues.color.white,
  },
  commentHeadingAndUserName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: theme.spacing(1),
  },
  commentDetails: {
    color: themeValues.color.color1,
  },
  ratingWrap: {
    position: "absolute",
    right: 0,
    justifySelf: "end",
  },
}));
