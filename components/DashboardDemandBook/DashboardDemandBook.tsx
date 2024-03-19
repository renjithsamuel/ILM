import { Book } from "@/entity/Book/Book";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useDashboardDemandBookStyles } from "./DashboardDemandBook.styles";
import clsx from "clsx";
import Link from "next/link";

interface DashboardDemandBookProps {
  book: Book;
}

export const DashboardDemandBook = ({ book }: DashboardDemandBookProps) => {
  const classes = useDashboardDemandBookStyles();

  return (
    <Box className={clsx(classes.dashboardDemandBookRoot)}>
      <Link href={`/allbooks/${book.ID}`}>
        <div className={clsx(classes.bookContainer, "bookContainer")}>
          <img
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
