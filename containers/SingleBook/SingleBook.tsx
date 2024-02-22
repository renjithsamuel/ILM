import { Book } from "@/entity/Book/Book";
import { Box, Divider, Grid } from "@mui/material";
import { useSingleBookStyles } from "./SingleBook.styles";
import { useSingleBook } from "./SingleBook.hooks";
import Image from "next/image";
import { bookKeyValues } from "@/constants/GlobalConstants";
import { BookGridItem } from "@/components/BookGridItem/BookGridItem";
import { Button, Typography } from "@material-ui/core";
import { mockBooks } from "@/entity/Book/Book.mock";
import { SimilarBookItem } from "@/components/SimilarBookItem/SimilarBookItem";
import clsx from "clsx";
import Link from "next/link";
import ReactPDF, { Document, Page } from "@react-pdf/renderer";
import { IoHeartSharp } from "react-icons/io5";
import theme from "@/styles/theme";

interface singleBookParams {
  // book: Book;
}

export const SingleBook = ({}: singleBookParams) => {
  const classes = useSingleBookStyles();
  const { book } = useSingleBook({});

  if (!book) {
    return <></>;
  }

  return (
    <Box className={classes.singleBookRoot}>
      <Box className={classes.singleBookContent}>
        <Box className={classes.singleBookMainContent}>
          {/* book image */}
          <Link href={book?.previewLink || ""} target="_blank">
            <Box className={classes.singleBookImage}>
              <Image
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
            {bookKeyValues.map((keyValues, index) => (
              <Box key={index} className={classes.singleBookItemWrap}>
                <Box className={classes.bookItemKey}>{keyValues.name}</Box>
                <Box className={classes.bookItemValue}>
                  {keyValues.get(book)}
                </Box>
              </Box>
            ))}
          </Box>
          {/*  book  Buttons*/}
          <Box className={classes.singleBookButtons}>
            <Button variant="contained" className={classes.reserveNowBtn}>
              Reserve Now
            </Button>
            <Button variant="contained" className={classes.wishlistBtn}>
              <IoHeartSharp size={theme.spacing(2.2)} />
              {"  "}
              <Typography variant="body1">{"  "}Wishlist</Typography>
            </Button>
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
        <Box className={classes.singleBookComments}>
          Book Comments, Currently Under Work
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
      </Box>
      <Box className={classes.similarBooks}>
        {/* show books of this genre */}
        <Typography variant="body1" className={classes.similarBooksText}>
          Similar{" "}
        </Typography>
        {mockBooks?.length > 0 ? (
          mockBooks.map((book: Book, index) => (
            <Grid item key={index} xs={6} sm={4} md={3}>
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
