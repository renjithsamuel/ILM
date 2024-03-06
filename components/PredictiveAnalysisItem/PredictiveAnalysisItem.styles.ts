import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const usePredictiveAnalysisItemStyles = makeStyles((theme) => ({
  predictiveAnalysisItemRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    animation: themeValues.animation.slideUp,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "pointer",
    },
  },
  predictLeft: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: theme.spacing(2),
  },
  predictRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: theme.spacing(2),
  },
  bookImageWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
  },
  bookImage: {
    borderRadius: themeValues.border.borderRadius,
  },
  bookName: {
    color: themeValues.color.color1,
  },
  authorName: {
    color: themeValues.color.color1,
    opacity: 0.7,
  },
  ratingWrap: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  bookCounts: {
    display: "flex",
    alignSelf: "center",
    justifySelf: "end",
    gap: theme.spacing(2),
    color: themeValues.color.color1,
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
}));
