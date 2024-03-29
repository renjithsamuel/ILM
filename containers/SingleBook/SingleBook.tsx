import { Book } from "@/entity/Book/Book";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Rating,
  Select,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSingleBookStyles } from "./SingleBook.styles";
import { useSingleBook } from "./SingleBook.hooks";
import {
  ReviewSortValue,
  singleBookKeyValues,
} from "@/constants/GlobalConstants";
import { BookGridItem } from "@/components/BookGridItem/BookGridItem";
import { mockBooks } from "@/entity/Book/Book.mock";
import { SimilarBookItem } from "@/components/SimilarBookItem/SimilarBookItem";
import clsx from "clsx";
import Link from "next/link";
import ReactPDF, { Document, Page } from "@react-pdf/renderer";
import { IoHeartSharp } from "react-icons/io5";
import theme from "@/styles/theme";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Role } from "@/constants/Role";
import { SiBookstack } from "react-icons/si";
import { GoEye } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { ModifyCount } from "@/components/ModifyCount/ModifyCount";
import { themeValues } from "@/constants/ThemeConstants";
import { BiSolidMessageDetail } from "react-icons/bi";
import { AddComment } from "@/components/AddComment/AddComment";
import { CommentItem } from "@/components/CommentItem/CommentItem";
import { FormatTextUtil } from "@/utils/formatText";

interface singleBookParams {
  // book: Book;
}

export const SingleBook = ({}: singleBookParams) => {
  const classes = useSingleBookStyles();
  const {
    similarBooks,
    isBookCompleted,
    isSimilarBooksLoading,
    checkoutData,
    commentList,
    book,
    userType,
    user,
    wishlisted,
    isModifyCountOpen,
    isAddCommentOpen,
    isCommentsLoading,
    isBookLoading,
    handleAddComment,
    handleModifyCount,
    handleAddToLibrary,
    setIsModifyCountOpen,
    handleCheckoutFlow,
    handleAddToWishList,
    // pagination and sorting
    totalPages,
    sortByValue,
    pageNumber,
    rowsPerPage,
    handleRowsPerPage,
    handlePageNumber,
    handleSortValue,
  } = useSingleBook({});

  if (!book) {
    return <></>;
  }
  // todo when book count is Zero update inLibrary to false

  return (
    <Box className={classes.singleBookRoot}>
      {/* add comment popup */}
      {isAddCommentOpen && checkoutData && (
        <AddComment
          handleAddComment={handleAddComment}
          user={user}
          book={book}
          checkout={checkoutData}
        />
      )}
      {/* modify count popup */}
      {isModifyCountOpen && (
        <ModifyCount setIsModifyCountOpen={setIsModifyCountOpen} book={book} />
      )}

      <Box className={classes.singleBookContent}>
        <Box className={classes.singleBookMainContent}>
          {/* book image */}
          <Link href={book?.previewLink || ""} target="_blank">
            <Box className={classes.singleBookImage}>
              <img
                src={book?.coverImage}
                width={150}
                height={220}
                alt={book.title || `book`}
                className={clsx(classes.bookImage, "bookImage")}
              />
              <Typography
                variant="body1"
                className={clsx(classes.bookTitle, "bookTitle")}
              >
                View
              </Typography>
            </Box>
          </Link>
          <Divider />
          {/*  book  details*/}
          <Box className={classes.singleBookDetails}>
            {isBookLoading ? (
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
            ) : (
              singleBookKeyValues.map((keyValues, index) => {
                if (keyValues.key === "shelfNumber" && !book.inLibrary) return;
                return (
                  <Box key={index} className={classes.singleBookItemWrap}>
                    <Box className={classes.bookItemKey}>{keyValues.name}</Box>
                    <Box className={classes.bookItemValue}>
                      {keyValues.get(book)}
                    </Box>
                  </Box>
                );
              })
            )}
            {/* book rating  */}
            <Box className={classes.bookRating}>
              <Rating
                name="read-only"
                value={book.rating}
                readOnly
                precision={1}
                color={themeValues.color.color1}
              />
            </Box>
            {/* book counts */}
            <Box className={classes.bookCounts}>
              {/* views */}
              <Tooltip title={"views"} placement="bottom">
                <Box className={classes.bookCount}>
                  <GoEye /> {FormatTextUtil.formatNumberToK(book.views)}
                </Box>
              </Tooltip>
              {/* stock */}
              {book.inLibrary && (
                <Tooltip title={"stock"} placement="bottom">
                  <Box className={classes.bookCount}>
                    <SiBookstack />{" "}
                    {FormatTextUtil.formatNumberToK(book.booksLeft)}
                  </Box>
                </Tooltip>
              )}
              {/* wishlist */}
              <Tooltip title={"wishlists"} placement="bottom">
                <Box className={classes.bookCount}>
                  <IoMdHeart />{" "}
                  {FormatTextUtil.formatNumberToK(book.wishlistCount)}
                </Box>
              </Tooltip>
              {/* reviews */}
              <Tooltip title={"reviews"} placement="bottom">
                <Box className={classes.bookCount}>
                  <BiSolidMessageDetail />{" "}
                  {FormatTextUtil.formatNumberToK(book.reviewCount)}
                </Box>
              </Tooltip>
            </Box>
          </Box>
          {/*  book  Buttons*/}
          <Box className={classes.singleBookButtons}>
            {/* modify count or add to library */}
            {userType === Role.Librarian && (
              <Box>
                <Button
                  variant="contained"
                  className={classes.reserveNowBtn}
                  onClick={() => {
                    book.inLibrary ? handleModifyCount() : handleAddToLibrary();
                  }}
                >
                  {!book.inLibrary ? "Add to Library" : "Modify Count"}
                </Button>
              </Box>
            )}
            {/* reserve btn  todo create a checkout ticket when someone reserves and will be deleted within 15 days and 
              also once checked out the no of days activates updating checkedout date, everytime the transaction page loads 
              need to update DB on the, fineamount and return date exceeding it 
            */}
            {(userType === Role.Librarian || userType === Role.Patrons) &&
              book.inLibrary && (
                <Tooltip
                  title={
                    !user.isPaymentDone
                      ? "membership required"
                      : book.booksLeft === 0
                        ? "out of stock"
                        : ""
                  }
                  placement="top"
                >
                  <Box>
                    <Button
                      variant="contained"
                      className={classes.reserveNowBtn}
                      disabled={
                        book.booksLeft === 0 || !user.isPaymentDone
                          ? true
                          : false
                      }
                      onClick={() => handleCheckoutFlow(book.ID)}
                    >
                      Reserve Now
                    </Button>
                  </Box>
                </Tooltip>
              )}
            {/* wishlist btn */}
            {(userType === Role.Librarian || userType === Role.Patrons) && (
              <Button
                variant="contained"
                className={classes.wishlistBtn}
                onClick={handleAddToWishList}
              >
                <Typography variant="body2" sx={{ mr: theme.spacing(0.3) }}>
                  {wishlisted ? "Wishlisted" : "Wishlist"}
                </Typography>
                <IoHeartSharp size={theme.spacing(2.2)} />
                {"  "}
              </Button>
            )}
            {/* completed btn todo check for the checkedout array of user and open dialog to complete the report*/}
            {/* todo remove for librarian */}
            {userType === Role.Patrons ||
              (userType === Role.Librarian && (
                <Tooltip
                  title={
                    isBookCompleted
                      ? "Comment Already Added"
                      : !checkoutData?.isReturned
                        ? "Read Book To Add Comment"
                        : ""
                  }
                  placement="right"
                >
                  <Box>
                    <Button
                      variant="contained"
                      className={classes.reserveNowBtn}
                      disabled={isBookCompleted || !checkoutData?.isReturned}
                      onClick={handleAddComment}
                    >
                      <Typography
                        variant="body2"
                        sx={{ mr: theme.spacing(0.6) }}
                      >
                        {"Completed"}
                      </Typography>
                      <MdOutlineDone size={theme.spacing(2.2)} />
                      {"  "}
                    </Button>
                  </Box>
                </Tooltip>
              ))}
            {/* checkout btn  */}
            {/* todo when checking out go to /transactions/{isbn} capture it and add in search filed */}
            {userType === Role.Librarian && book.inLibrary && (
              <Link href={`/transactions?${book.ISBN}`}>
                <Button
                  variant="contained"
                  className={classes.reserveNowBtn}
                  disabled={book.booksLeft === 0 ? true : false}
                >
                  <Typography variant="body2" sx={{ mr: theme.spacing(0.6) }}>
                    {"  "}Checkout
                  </Typography>
                  <MdOutlineShoppingCartCheckout size={theme.spacing(2.2)} />
                  {"  "}
                </Button>
              </Link>
            )}
          </Box>
        </Box>
        {/* book preview */}
        <Box className={classes.singleBookPreview}>
          Book Preview, Currently Under Work
          {/* <iframe
            src="https://www.thebookcollector.co.uk/sites/default/files/the-book-collector-example-2018-04.pdf"
            width="100%"
            height="600px"
          ></iframe> */}
          {/* <Document
            file="https://www.thebookcollector.co.uk/sites/default/files/the-book-collector-example-2018-04.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
          </Document> */}
        </Box>
        {/* comments */}
        <Box>
          <Box className={classes.commentLabelWrap}>
            <Typography variant="h6" className={classes.commentsLabel}>
              {"Comments"}
            </Typography>
            <Box className={classes.sortByContainer}>
              {/* sort by */}
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
                  <MenuItem value={ReviewSortValue.likes}>
                    {ReviewSortValue.likes}
                  </MenuItem>
                  <MenuItem value={ReviewSortValue.newest}>
                    {ReviewSortValue.newest}
                  </MenuItem>
                  <MenuItem value={ReviewSortValue.oldest}>
                    {ReviewSortValue.oldest}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className={classes.singleBookComments}>
            {/* Book Comments, Currently Under Work */}
            <List sx={{ width: "100%", bgcolor: "transparent" }}>
              {isCommentsLoading ? (
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
              ) : commentList && commentList.length > 0 ? (
                commentList.map((item) => (
                  <CommentItem review={item} key={item.ID} />
                ))
              ) : (
                <Typography variant="h4" className={classes.noBooksText}>
                  No Comments
                </Typography>
              )}
            </List>
          </Box>
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
      </Box>
      <Box className={classes.similarBooks}>
        {/* show books of this genre */}
        <Typography variant="body1" className={classes.similarBooksText}>
          Similar{" "}
        </Typography>
        {isSimilarBooksLoading ? (
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
        ) : similarBooks?.length > 0 ? (
          similarBooks.map((book: Book, index) => (
            <Grid item key={book.ID} xs={6} sm={4} md={3}>
              <SimilarBookItem book={book} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" className={classes.noBooksText}>
            No Books
          </Typography>
        )}
      </Box>
    </Box>
  );
};
