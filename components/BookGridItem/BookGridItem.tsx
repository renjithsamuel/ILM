import { Book } from "@/entity/Book/Book";
import { Box, Divider, Rating, Tooltip } from "@mui/material";
import { useBookGridItemStyles } from "./BookGridItem.styles";
import Image from "next/image";
import { bookKeyValues } from "@/constants/GlobalConstants";
import { clsx } from "clsx";
import { useBookGridItem } from "./BookGridItem.hooks";
import { SiBookstack } from "react-icons/si";
import { GoEye } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import { themeValues } from "@/constants/ThemeConstants";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FormatTextUtil } from "@/utils/formatText";

interface BookGridItemProps {
  book: Book;
}

export const BookGridItem = ({ book }: BookGridItemProps) => {
  const classes = useBookGridItemStyles();
  const { handleBookItemClick } = useBookGridItem({});

  return (
    <Box className={classes.bookItemContainer}>
      <Box
        className={classes.bookImageWrap}
        onClick={() => handleBookItemClick(book.ISBN)}
      >
        <Image
          src={book.coverImage}
          width={90}
          height={120}
          alt={book.title || `book`}
          className={classes.bookImage}
        />
      </Box>
      <Box className={classes.bookRating}>
        <Rating
          name="read-only"
          value={book.rating}
          readOnly
          precision={0.5}
          color={themeValues.color.color1}
        />
      </Box>
      <Box className={classes.bookCounts}>
        {/* views */}
        <Tooltip title={"views"} placement="top">
          <Box className={classes.bookCount}>
            <GoEye /> {FormatTextUtil.formatNumberToK(book.views)}
          </Box>
        </Tooltip>
        {/* stock */}
        {book.inLibrary && (
          <Tooltip title={"stock"} placement="top">
            <Box className={classes.bookCount}>
              <SiBookstack /> {FormatTextUtil.formatNumberToK(book.booksLeft)}
            </Box>
          </Tooltip>
        )}
        {/* wishlist */}
        <Tooltip title={"wishlists"} placement="top">
          <Box className={classes.bookCount}>
            <IoMdHeart /> {FormatTextUtil.formatNumberToK(book.wishlistCount)}
          </Box>
        </Tooltip>
        {/* reviews */}
        <Tooltip title={"reviews"} placement="top">
          <Box className={classes.bookCount}>
            <BiSolidMessageDetail />{" "}
            {FormatTextUtil.formatNumberToK(book.reviewCount)}
          </Box>
        </Tooltip>
      </Box>

      <Box className={classes.bookContent}>
        <Divider />
        {bookKeyValues.map((keyValues, index) => {
          if (keyValues.key === "shelfNumber" && !book.inLibrary) return;
          return (
            <Box
              className={clsx(classes.keyValueContainer, {
                [classes.bookDescription]: keyValues.key === "desc",
              })}
              key={index}
            >
              <Box className={classes.bookItemKey}>{keyValues.name}</Box>
              <Box className={classes.bookItemValue}>{keyValues.get(book)}</Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
