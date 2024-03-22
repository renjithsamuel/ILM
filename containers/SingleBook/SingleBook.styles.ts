import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useSingleBookStyles = makeStyles((theme) => ({
  singleBookRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
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
    display: "flex",
    gap: theme.spacing(2),
    flexDirection: "column",
    borderRadius: themeValues.border.borderRadiusHigh,
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
    borderRadius: themeValues.border.borderRadiusHigh,
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
    borderRadius: themeValues.border.borderRadiusHigh,
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
    width: "30vw",
  },
  bookRating: {
    display: "flex",
    alignSelf: "center",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  bookCounts: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignSelf: "center",
    gap: theme.spacing(2),
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
    width: "18vw",
    height: "auto",
    overflow: "hidden",
    wordWrap: "break-word",
    fontSize: themeValues.spacing(1.9),
  },
  singleBookButtons: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  reserveNowBtn: {
    color: themeValues.color.white,
    backgroundColor: themeValues.color.color1,
    "&:hover": {
      color: themeValues.color.white,
      backgroundColor: themeValues.color.color3,
    },
  },
  wishlistBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeValues.color.rubyRed,
    color: themeValues.color.white,
    "&:hover": {
      color: themeValues.color.white,
      backgroundColor: themeValues.color.rubyRedDark,
    },
  },
  singleBookPreview: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: theme.spacing(1),
    width: "63vw",
    height: "40vh",
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowboxy,
  },
  commentsLabel: {
    marginLeft: theme.spacing(2),
    fontWeight: themeValues.font.fontWeightThick,
  },
  singleBookComments: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    backgroundColor: "none",
    margin: theme.spacing(1),
    width: "auto",
    maxHeight: "auto",
    overflow: "visible",
    borderRadius: themeValues.border.borderRadiusHigh,
    // boxShadow: themeValues.shadow.boxShadowboxy,
  },
  similarBooks: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowboxy,
    width: "15vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(3),
  },
  similarBooksText: {
    fontSize: themeValues.font.fontSizeXLarge,
    fontWeight: themeValues.font.fontWeightThick,
    color: themeValues.color.color1,
  },
  noBooksText: {
    padding: theme.spacing(10),
    width: "auto",
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
  sortByContainer: {
    display: "flex",
    width: "auto",
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
  commentLabelWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
