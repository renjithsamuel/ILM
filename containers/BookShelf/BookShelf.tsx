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
      <Grid container spacing={2} className={classes.booksContainer}>
        {books?.length > 0 ? (
          books.map((book: Book, index) => (
            <Grid item key={index} xs={6} sm={4} md={2.4}>
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
