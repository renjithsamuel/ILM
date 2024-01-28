import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useBookShelfStyles = makeStyles((theme) => ({
    booksContainerRoot : {
        padding : theme.spacing(2),
    },
    booksContainer : {
        
    },
    noBooksText: {
        display : 'flex',
        justifyContent: 'center',
        alignItems : 'center',
        fontWeight: "600",
        [theme.breakpoints.up("md")]: {
          fontSize: "28px",
        },
        [theme.breakpoints.between("sm", "md")]: {
          fontSize: "25px",
        },
        [theme.breakpoints.between("xs","sm")]: {
          fontSize: "20px",
        },
      },
}))