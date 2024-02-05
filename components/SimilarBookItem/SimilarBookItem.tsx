import { Book } from "@/entity/Book/Book";
import { Box } from "@material-ui/core";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useSimilarBookItemStyles } from "./SimilarBookItem.styles";
import clsx from "clsx";
import Link from "next/link";

interface SimilarBookItemProps {
  book: Book;
}

export const SimilarBookItem = ({ book }: SimilarBookItemProps) => {
  const classes = useSimilarBookItemStyles();

  return (
    <Box className={clsx(classes.similarBookItemRoot)}>
      <Link href={`/bookshelf/${book.ID}`}>
        <div className={clsx(classes.bookContainer, "bookContainer")}>
          <Image
            src={book.coverImage}
            width={150}
            height={200}
            alt={book.title || `book`}
            className={clsx(classes.bookImage, "bookImage")}
          />
          <Typography
            variant="body2"
            className={clsx(classes.bookTitle, "bookTitle")}
          >
            {book.title}
          </Typography>
        </div>
      </Link>
    </Box>
  );
};
