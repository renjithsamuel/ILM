import { Box, Grid, Typography } from "@mui/material";
import { useBookShelfStyles } from "./BookShelf.styles";
import { Book } from "@/entity/Book/Book";
import { BookGridItem } from "@/components/BookGridItem/BookGridItem";

interface BookShelfProps {
  books: Book[];
}

export const BookShelf = ({ books }: BookShelfProps) => {
  const classes = useBookShelfStyles();

  return (
    <Box className={classes.booksContainerRoot}>
      <Typography className={classes.bookShelfTexts} >
        Recommendations
      </Typography>
      <Grid container spacing={3} className={classes.booksContainer}>
        {books?.length > 0 ? (
          books.map((book: Book) => (
            <Grid item key={book.ID} xs={6} sm={4} md={3}>
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
