import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useUserBooksList } from "./UserBooksList.hooks";
import { Box, Grid, Typography } from "@mui/material";
import { useUserBooksListStyles } from "./UserBooksList.styles";
import { Book } from "@/entity/Book/Book";
import { BookGridItem } from "@/components/BookGridItem/BookGridItem";
import { FormatTextUtil } from "@/utils/formatText";

interface userbookslistParams {
  // book: Book;
}

export const UserBooksList = ({}: userbookslistParams) => {
  const { bookList, bookDetailsFrom } = useUserBooksList({});
  const classes = useUserBooksListStyles();

  return (
    <Box className={classes.userbookslistRoot}>
      <Typography className={classes.userBookListTexts}>
        {FormatTextUtil.formatFirstWord(bookDetailsFrom)}
      </Typography>
      <Grid container spacing={2} className={classes.booksContainer}>
        {bookList && bookList?.length > 0 ? (
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
