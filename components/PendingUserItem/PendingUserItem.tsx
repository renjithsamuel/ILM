import { Box, Tooltip } from "@material-ui/core";
import { Typography } from "@mui/material";
import { usePendingUserItemStyles } from "./PendingUserItem.styles";
import { themeValues } from "@/constants/ThemeConstants";
import Link from "next/link";
import { IBookDetails } from "@/entity/UserBookDetails/UserBookDetails";

interface pendingUserItemParams {
  userID: string;
  userName: string;
  bookDetails: IBookDetails | undefined;
}

export const PendingUserItem = ({
  userID,
  userName,
  bookDetails,
}: pendingUserItemParams) => {
  const classes = usePendingUserItemStyles();
  return (
    <>
      <Link href={`/users/${userID}`}>
        <Box className={classes.pendingUserItem}>
          <Typography variant="h6" className={classes.userName}>
            {userName}
          </Typography>

          <Box className={classes.bookCounts}>
            {bookCounts.map((bookCount, index) => {
              return (
                <Tooltip title={bookCount.title} placement="top" key={index}>
                  <Typography
                    variant="h6"
                    className={classes.eachCount}
                    sx={{
                      border: themeValues.defaultborder,
                      borderColor: bookCount.borderColor,
                    }}
                  >
                    {bookDetails && bookCount.getbookCount(bookDetails)}
                  </Typography>
                </Tooltip>
              );
            })}
          </Box>
        </Box>
      </Link>
    </>
  );
};

const bookCounts = [
  {
    title: "books checked out",
    getbookCount: (bookDetails: IBookDetails) =>
      bookDetails.checkedOutBooksCount,
    borderColor: "brown",
  },
  {
    title: "books reserved",
    getbookCount: (bookDetails: IBookDetails) => bookDetails.reservedBooksCount,
    borderColor: "green",
  },
  {
    title: "books pending",
    getbookCount: (bookDetails: IBookDetails) => bookDetails.pendingBooksCount,
    borderColor: "pink",
  },
];
