import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useSingleBookStyles = makeStyles((theme) => ({
  singleBookRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  singleBookBg: {
    position: "relative",
    top: 10,
    left: 20,
    zIndex: -1,
    backgroundColor: "red",
  },
  singleBookContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    width: "65vw",
    borderRadius: themeValues.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowboxy,
    // glassmorphism
    // background: "rgba(255, 255, 255, 0.37)",
    // borderRadius: "16px",
    // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    // backdropFilter: "blur(10px)",
    // border: "1px solid rgba(255, 255, 255, 1)",
    // "&::-webkit-backdrop-filter": "blur(10px)",
  },
  singleBookMainContent: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  singleBookImage: {
    position: "relative",
    diplay: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: themeValues.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowLight,
    transition: themeValues.transition.defaultTansition,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowBookHover,
      cursor: "pointer",
    },
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
  singleBookDetails: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: theme.spacing(1),
    width: "40vw",
  },
  singleBookItemWrap: {
    display: "flex",
    gap: theme.spacing(1),
  },
  bookItemKey: {
    width: "10vw",
    fontWeight: themeValues.font.fontWeightThick,
    fontSize: themeValues.spacing(2),
  },
  bookItemValue: {
    width: "30vw",
    height: "auto",
    wordWrap: "break-word",
    fontSize: themeValues.spacing(1.9),
  },
  singleBookPreview: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    margin: theme.spacing(1),
    width: "63vw",
    height: "40vh",
  },
  similarBooks: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: themeValues.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowboxy,
    width: "15vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(3),
  },
  noBooksText: {},
}));