import {
  Box,
  CircularProgress,
  Grid,
  TablePagination,
  Typography,
} from "@mui/material";
import { useBookShelfStyles } from "./BookShelf.styles";
import { Book } from "@/entity/Book/Book";
import { BookGridItem } from "@/components/BookGridItem/BookGridItem";
import { useBookShelf } from "./BookShelf.hooks";

interface BookShelfProps {
  books: Book[];
}

export const BookShelf = ({ books }: BookShelfProps) => {
  const {
    bookList,
    totalPages,
    pageNumber,
    rowsPerPage,
    isRecommendedbooksLoading,
    handleRowsPerPage,
    handlePageNumber,
  } = useBookShelf({});
  const classes = useBookShelfStyles();

  return (
    <Box className={classes.booksContainerRoot}>
      <Typography className={classes.bookShelfTexts}>
        Recommendations
      </Typography>
      <Grid container spacing={3} className={classes.booksContainer}>
        {isRecommendedbooksLoading ? (
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
        ) : bookList?.length > 0 ? (
          bookList.map((book: Book) => (
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
      {/* pagination */}
      <Box className={classes.paginationWrap}>
        <TablePagination
          component="div"
          count={totalPages}
          page={pageNumber}
          onPageChange={handlePageNumber}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPage}
        />
      </Box>
    </Box>
  );
};
