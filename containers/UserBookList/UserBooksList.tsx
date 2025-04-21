import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useUserBooksList } from "./UserBooksList.hooks";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useUserBooksListStyles } from "./UserBooksList.styles";
import { Book } from "@/entity/Book/Book";
import { BookGridItem } from "@/components/BookGridItem/BookGridItem";
import { FormatTextUtil } from "@/utils/formatText";

interface userbookslistParams {
  // book: Book;
}

export const UserBooksList = ({}: userbookslistParams) => {
  const { bookList, bookDetailsFrom, isBookListLoading } = useUserBooksList({});
  const classes = useUserBooksListStyles();

  return (
    <Box className={classes.userbookslistRoot}>
      <Typography className={classes.userBookListTexts}>
        {FormatTextUtil.formatFirstWord(bookDetailsFrom)}
      </Typography>
      <Grid container spacing={2} className={classes.booksContainer}>
        {isBookListLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "65vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : bookList && bookList?.length > 0 ? (
          bookList.map((book: Book, index) => (
            <Grid item key={index} xs={6} sm={4} md={3}>
              <BookGridItem book={book} />
            </Grid>
          ))
        ) : (
          <Typography variant="h4" className={classes.noBooksText}>
            No Books
          </Typography>
        )}
      </Grid>
    </Box>
  );
};
