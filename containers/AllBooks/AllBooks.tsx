import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useAllBooks } from "./AllBooks.hooks";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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

interface allBooksParams {
  // book: Book;
}

export const AllBooks = ({}: allBooksParams) => {
  const {
    bookList,
    sortByOrder,
    sortByValue,
    sortByPresence,
    handleSortPresence,
    handleSortOrder,
    handleSortValue,
  } = useAllBooks({});
  const classes = useAllBooksStyles();

  return (
    <Box className={classes.allBooksRoot}>
      {/* sort by */}
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
            <MenuItem value={BookSortValue.wishlistCount}>
              wishlist count
            </MenuItem>
            <MenuItem value={BookSortValue.views}>views</MenuItem>
            <MenuItem value={BookSortValue.booksLeft}>books left</MenuItem>
            <MenuItem value={BookSortValue.title}>title</MenuItem>
            <MenuItem value={BookSortValue.author}>author</MenuItem>
            <MenuItem value={BookSortValue.genre}>genre</MenuItem>
            <MenuItem value={BookSortValue.rating}>rating</MenuItem>
            <MenuItem value={BookSortValue.publishedDate}>
              published date
            </MenuItem>
            <MenuItem value={BookSortValue.shelfNumber}>shelf number</MenuItem>
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
        {/* Presence */}
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="demo-controlled-open-select-label">
            Presence
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={sortByPresence}
            label="Order By"
            onChange={handleSortPresence}
          >
            <MenuItem value={SortPresence.both}>Both</MenuItem>
            <MenuItem value={SortPresence.inLibrary}>In Library</MenuItem>
            <MenuItem value={SortPresence.others}>Others</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} className={classes.booksContainer}>
        {bookList?.length > 0 ? (
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
