import { Book } from "@/entity/Book/Book";
import { Box } from "@mui/material";
import { useBookGridItemStyles } from "./BookGridItem.styles";
import Image from "next/image";
import { bookKeyValues } from "@/constants/GlobalConstants";
import { clsx } from "clsx";

interface BookGridItemProps {
  book: Book;
}

export const BookGridItem = ({ book }: BookGridItemProps) => {
  const classes = useBookGridItemStyles();

  return (
    <Box className={classes.bookItemContainer}>
      <Box className={classes.bookImageWrap}>
        <Image
          src={book.coverImage}
          width={90}
          height={120}
          alt={book.title || `book`}
          className={classes.bookImage}
        />
      </Box>
      <Box className={classes.bookContent}>
        {bookKeyValues.map((keyValues, index) => (
          <Box
            className={clsx(classes.keyValueContainer, {
              [classes.bookDescription]: keyValues.key === "desc",
            })}
            key={index}
          >
            <Box className={classes.bookItemKey}>{keyValues.name}</Box>
            <Box className={classes.bookItemValue}>{keyValues.get(book)}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
