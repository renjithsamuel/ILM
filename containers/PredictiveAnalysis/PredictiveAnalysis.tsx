import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  Typography,
} from "@mui/material";
import { usePredictiveAnalysisStyles } from "./PredictiveAnalysis.styles";
import { BookSortValue, SortOrder } from "@/constants/GlobalConstants";
import { usePredictiveAnalysis } from "./PredictiveAnalysis.hooks";
import { Book } from "@/entity/Book/Book";
import { PredictiveAnalysisItem } from "@/components/PredictiveAnalysisItem/PredictiveAnalysisItem";

interface predictiveAnalysisParams {}

export const PredictiveAnalysis = ({}: predictiveAnalysisParams) => {
  const {
    bookList,
    sortByOrder,
    sortByValue,
    pageNumber,
    rowsPerPage,
    totalPages,
    handleRowsPerPage,
    handlePageNumber,
    handleSortOrder,
    handleSortValue,
  } = usePredictiveAnalysis({});
  const classes = usePredictiveAnalysisStyles();
  return (
    <>
      <Box className={classes.predictiveAnalysisRoot}>
        {/* sorts */}
        <Box className={classes.sortByContainer}>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-controlled-open-select-label">
              Sort By
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={sortByValue}
              label="Sort By"
              onChange={handleSortValue}
            >
              <MenuItem value={BookSortValue.approximateDemand}>
                demand
              </MenuItem>
              <MenuItem value={BookSortValue.wishlistCount}>
                wishlist count
              </MenuItem>
              <MenuItem value={BookSortValue.views}>views</MenuItem>
              <MenuItem value={BookSortValue.rating}>rating</MenuItem>
              <MenuItem value={BookSortValue.reviewCount}>reviews</MenuItem>
            </Select>
          </FormControl>
          {/* order */}
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-controlled-open-select-label">
              Order By
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={sortByOrder}
              label="Order By"
              onChange={handleSortOrder}
            >
              <MenuItem value={SortOrder.asc}>Ascending</MenuItem>
              <MenuItem value={SortOrder.desc}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* PredictiveAnalysisItems */}
        <Grid container spacing={2} className={classes.booksContainer}>
          {bookList?.length > 0 ? (
            bookList.map((book: Book, index) => (
              <PredictiveAnalysisItem book={book} key={index} />
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
            count={totalPages}
            page={pageNumber}
            onPageChange={handlePageNumber}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPage}
          />
        </Box>
      </Box>
    </>
  );
};
