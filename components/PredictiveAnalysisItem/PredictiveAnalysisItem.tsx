import { Box, Rating, Tooltip, Typography } from "@mui/material";
import { usePredictiveAnalysisItemStyles } from "./PredictiveAnalysisItem.styles";
import { themeValues } from "@/constants/ThemeConstants";
import Link from "next/link";
import { Book } from "@/entity/Book/Book";
import Image from "next/image";
import { SiBookstack } from "react-icons/si";
import { GoEye } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";

interface predictiveAnalysisItemParams {
  book: Book;
}

export const PredictiveAnalysisItem = ({
  book,
}: predictiveAnalysisItemParams) => {
  const classes = usePredictiveAnalysisItemStyles();
  return (
    <>
      <Link href={`/allbooks/${book.ISBN}`}>
        <Box className={classes.predictiveAnalysisItemRoot}>
          <Box className={classes.predictLeft}>
            {/* Book Image */}
            <Box className={classes.bookImageWrap}>
              <img
                src={book.coverImage}
                width={50}
                height={60}
                alt={book.title || `book`}
                className={classes.bookImage}
              />
            </Box>
            {/* book name and author */}
            <Box>
              <Typography
                variant="h6"
                className={classes.bookName}
                sx={{ fontWeight: themeValues.font.fontWeightThick }}
              >
                {book.title}
              </Typography>
              <Typography variant="body2" className={classes.authorName}>
                {book.author}
              </Typography>
            </Box>
            {/* rating  */}
            <Box className={classes.ratingWrap}>
              <Rating
                name="read-only"
                value={book.rating}
                readOnly
                precision={1}
                color={themeValues.color.color1}
              />
            </Box>
          </Box>
          <Box className={classes.predictRight}>
            {/* item counts */}
            <Box className={classes.bookCounts}>
              <Tooltip title={"views"} placement="top">
                <Box className={classes.bookCount}>
                  <GoEye /> {book.views}
                </Box>
              </Tooltip>
              {/* wishlist */}
              <Tooltip title={"wishlists"} placement="top">
                <Box className={classes.bookCount}>
                  <IoMdHeart /> {book.wishlistCount}
                </Box>
              </Tooltip>
              {/* reviews */}
              <Tooltip title={"reviews"} placement="top">
                <Box className={classes.bookCount}>
                  <BiSolidMessageDetail /> {book.reviewCount}
                </Box>
              </Tooltip>
              {/* stock */}
              <Tooltip title={"stock"} placement="top">
                <Box className={classes.bookCount}>
                  {"Stock "} <SiBookstack /> {book.booksLeft}
                </Box>
              </Tooltip>

              {/* approximate demand */}

              <Tooltip title={"approximate demand"} placement="top">
                <Box className={classes.bookCount}>
                  {"Demand "} <GoChecklist /> {book?.approximateDemand}
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Link>
    </>
  );
};
