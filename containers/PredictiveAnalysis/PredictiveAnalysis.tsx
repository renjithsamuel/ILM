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
import { usePredictiveAnalysisStyles } from "./PredictiveAnalysis.styles";
import { BookSortValue, SortOrder } from "@/constants/GlobalConstants";
import { usePredictiveAnalysis } from "./PredictiveAnalysis.hooks";
import { Book } from "@/entity/Book/Book";
import { PredictiveAnalysisItem } from "@/components/PredictiveAnalysisItem/PredictiveAnalysisItem";

interface predictiveAnalysisParams {}

export const PredictiveAnalysis = ({}: predictiveAnalysisParams) => {
  const {
    bookList,
    pageNumber,
    rowsPerPage,
    totalPages,
    isPredictiveAnalysisLoading,
    handleRowsPerPage,
    handlePageNumber,
  } = usePredictiveAnalysis({});
  const classes = usePredictiveAnalysisStyles();
  return (
    <>
      <Box className={classes.predictiveAnalysisRoot}>
        {/* PredictiveAnalysisItems */}
        <Grid container spacing={2} className={classes.booksContainer}>
          {isPredictiveAnalysisLoading ? (
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
        ) 
         : bookList?.length > 0 ? (
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
