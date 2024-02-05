import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useSimilarBookItemStyles = makeStyles((theme) => ({
  similarBookItemRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bookContainer: {
    position: "relative",
    width: "7vw",
    height: "auto",
    overflow: "hidden",
    borderRadius: themeValues.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    "&:hover .bookImage": {
      transform: "scale(1.1)",
      cursor: "pointer",
    },
    "&:hover .bookTitle": {
      opacity: 1,
      cursor: "pointer",
    },
  },
  bookImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: themeValues.borderRadiusHigh,
    transition: "transform 0.3s ease-in-out",
  },
  bookTitle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
  },
}));
