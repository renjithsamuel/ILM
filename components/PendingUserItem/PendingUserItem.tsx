import { Tooltip } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
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
                <Box
                  key={index}
                  sx={{
                    border: themeValues.border.defaultborder,
                    borderColor: bookCount.borderColor,
                    "&:hover": {
                      backgroundColor: bookCount.borderColor,
                      color: themeValues.color.white,
                    },
                  }}
                  className={classes.eachCount}
                >
                  <Typography variant="h6" className={classes.labelName}>
                    {bookCount.label}
                  </Typography>
                  {/* <Tooltip title={bookCount.title} placement="top"> */}
                  <Typography variant="h6">
                    {bookDetails && bookCount.getbookCount(bookDetails)}
                  </Typography>
                  {/* </Tooltip> */}
                </Box>
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
    label: "checked out",
    getbookCount: (bookDetails: IBookDetails) =>
      bookDetails.checkedOutBooksCount,
    borderColor: "brown",
  },
  {
    title: "books reserved",
    label: "reserved",
    getbookCount: (bookDetails: IBookDetails) => bookDetails.reservedBooksCount,
    borderColor: "green",
  },
  {
    title: "books pending",
    label: "pending",
    getbookCount: (bookDetails: IBookDetails) => bookDetails.pendingBooksCount,
    borderColor: themeValues.color.rubyRed,
  },
];
