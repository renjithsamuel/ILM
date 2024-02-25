import { Tooltip } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import { usePendingUserItemStyles } from "./PendingUserItem.styles";
import { themeValues } from "@/constants/ThemeConstants";
import Link from "next/link";
import { IBookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { UserBookDetailType } from "@/constants/GlobalConstants";

interface pendingUserItemParams {
  userID: string;
  userName: string;
  bookDetails: IBookDetails | undefined;
  sortByValue: UserBookDetailType;
}

export const PendingUserItem = ({
  userID,
  userName,
  bookDetails,
  sortByValue,
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
                    bgcolor:
                      (sortByValue === bookCount.detailType)
                        ? bookCount.borderColor
                        : "",
                    color:
                      (sortByValue === bookCount.detailType)
                        ? themeValues.color.white
                        : themeValues.color.color1,
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
    title: "books Checked out",
    label: "checked out",
    detailType: UserBookDetailType.CheckedOut,
    getbookCount: (bookDetails: IBookDetails) =>
      bookDetails.checkedOutBooksCount,
    borderColor: "brown",
  },
  {
    title: "books Reserved",
    label: "reserved",
    detailType: UserBookDetailType.Reserved,
    getbookCount: (bookDetails: IBookDetails) => bookDetails.reservedBooksCount,
    borderColor: "green",
  },
  {
    title: "books Pending",
    label: "pending",
    detailType: UserBookDetailType.Pending,
    getbookCount: (bookDetails: IBookDetails) => bookDetails.pendingBooksCount,
    borderColor: themeValues.color.rubyRed,
  },
  {
    title: "books Completed",
    label: "Completed",
    detailType: UserBookDetailType.Completed,
    getbookCount: (bookDetails: IBookDetails) =>
      bookDetails.completedBooksCount,
    borderColor: themeValues.color.color1,
  },
  {
    title: "books Wishlisted",
    label: "Wishlisted",
    detailType: UserBookDetailType.WishLists,
    getbookCount: (bookDetails: IBookDetails) =>
      bookDetails.wishlistBooks.length,
    borderColor: themeValues.color.color2,
  },
];
