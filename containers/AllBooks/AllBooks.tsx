import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useAllBooks } from "./AllBooks.hooks";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  Typography,
} from "@mui/material";
import { useAllBooksStyles } from "./AllBooks.styles";
import { Book } from "@/entity/Book/Book";
import { BookGridItem } from "@/components/BookGridItem/BookGridItem";
import { FormatTextUtil } from "@/utils/formatText";
import {
  BookSortValue,
  SortOrder,
  SortPresence,
} from "@/constants/GlobalConstants";
import { GoogleOrderByValues } from "@/constants/GoogleAPI";

interface allBooksParams {
  // book: Book;
}

export const AllBooks = ({}: allBooksParams) => {
  const {
    bookList,
    pageNumber,
    rowsPerPage,
    totalItems,
    isGetNewAllBooksLoading,
    handleRowsPerPage,
    handlePageNumber,
  } = useAllBooks({});
  const classes = useAllBooksStyles();

  return (
    <Box className={classes.allBooksRoot}>
      <Grid container spacing={2} className={classes.booksContainer}>
        {isGetNewAllBooksLoading ? (
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
      <Box className={classes.paginationWrap}>
        <TablePagination
          component="div"
          count={totalItems}
          page={pageNumber}
          onPageChange={handlePageNumber}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPage}
        />
      </Box>
    </Box>
  );
};

{
  /* <MenuItem value={GoogleOrderByValues.author}>author</MenuItem> */
}
{
  /* <MenuItem value={GoogleOrderByValues.newest}>newest</MenuItem> */
}
{
  /* <MenuItem value={GoogleOrderByValues.oldest}>oldest</MenuItem> */
}
{
  /* <MenuItem value={GoogleOrderByValues.relevance}>relevance</MenuItem> */
}
