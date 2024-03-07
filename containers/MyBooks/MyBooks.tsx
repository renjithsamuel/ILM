import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useMyBooks } from "./MyBooks.hooks";
import { Box, Typography } from "@mui/material";
import { useMyBooksStyles } from "./MyBooks.styles";
import { User } from "@/entity/User/User";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import dayjs from "dayjs";
import Link from "next/link";

interface myBooksParams {
  // book: Book;
}

export const MyBooks = ({}: myBooksParams) => {
  const { user, userBookDetail } = useMyBooks({});
  const classes = useMyBooksStyles();

  return (
    <Box className={classes.myBooksRoot}>
      {/* user cover image and profile */}
      <Box className={classes.userCover}>
        <Box className={classes.userImage}></Box>
      </Box>
      {/* user details */}
      <Box className={classes.userDetailsContainer}>
        {userDetailsArray.map((userDetail, index) => {
          return (
            <Box className={classes.userDetailBox} key={index}>
              <Typography variant="body1" className={classes.userDetailKey}>
                {userDetail.label}
              </Typography>
              <Typography variant="body1" className={classes.userDetailValue}>
                {userDetail.getUserValue(user)}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {/* book details */}
      <Box className={classes.bookDetailsContainer}>
        {bookDetailsArray.map((bookDetail, index) => {
          return (
            <Link href={bookDetail.getLink(user)} key={index}>
              <Box className={classes.bookDetailBox}>
                <Typography variant="body1" className={classes.bookDetailKey}>
                  {bookDetail.label}
                </Typography>
                <Typography variant="body1" className={classes.bookDetailValue}>
                  {userBookDetail &&
                    bookDetail.getBookDetailsValue(userBookDetail)}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

const userDetailsArray = [
  { label: "User Name", getUserValue: (user: User) => user.name },
  {
    label: "Date Of Birth",
    getUserValue: (user: User) => dayjs(user.dateOfBirth).format("DD-MM-YYYY"),
  },
  {
    label: "Member Since",
    getUserValue: (user: User) => dayjs(user.joinedDate).format("DD-MM-YYYY"),
  },
];

const bookDetailsArray = [
  {
    label: "Books Reserved",
    getBookDetailsValue: (bkDetails: BookDetails) =>
      bkDetails.reservedBooksCount,
    getLink: (user: User) => `/users/${user.userID}/reserved`,
  },
  {
    label: "Books Pending",
    getBookDetailsValue: (bkDetails: BookDetails) =>
      bkDetails.pendingBooksCount,
    getLink: (user: User) => `/users/${user.userID}/pending`,
  },
  {
    label: "Books Checked Out",
    getBookDetailsValue: (bkDetails: BookDetails) =>
      bkDetails.checkedOutBooksCount,
    getLink: (user: User) => `/users/${user.userID}/checkedout`,
  },
  {
    label: "Wishlisted Books",
    getBookDetailsValue: (bkDetails: BookDetails) =>
      bkDetails.wishlistBooks.length,
    getLink: (user: User) => `/users/${user.userID}/wishlists`,
  },
];
