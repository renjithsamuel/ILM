import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useSingleUser } from "./SingleUser.hooks";
import { Avatar, Box, Typography } from "@mui/material";
import { useSingleUserStyles } from "./SingleUser.styles";
import { User } from "@/entity/User/User";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import dayjs from "dayjs";
import Link from "next/link";
import { themeValues } from "@/constants/ThemeConstants";
import { FormatTextUtil } from "@/utils/formatText";

interface singleUserParams {
  // book: Book;
}

export const SingleUser = ({}: singleUserParams) => {
  const { user, userBookDetail } = useSingleUser({});
  const classes = useSingleUserStyles();

  return (
    <Box className={classes.singleUserRoot}>
      {/* user cover image and profile */}
      <Box className={classes.userCover}>
        <Box className={classes.userImageWrap}>
          {/* <Image
            src={user?.profileImageUrl}
            width={135}
            height={130}
            alt={user.name || `user`}
            className={classes.userImage}
          /> */}
          <Avatar className={classes.userImage}>
            {user?.name && FormatTextUtil.formatFirstWord(user?.name)}
          </Avatar>
        </Box>
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
                {user && userDetail.getUserValue(user)}
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
  {
    label: "User Name",
    getUserValue: (user: User) => FormatTextUtil.formatFirstWord(user.name),
  },
  {
    label: "Joined On",
    getUserValue: (user: User) => dayjs(user.joinedDate).format("DD-MM-YYYY"),
  },
  {
    label: "Role",
    getUserValue: (user: User) => FormatTextUtil.formatFirstWord(user.role),
  },
];

const bookDetailsArray = [
  {
    label: "Books Reserved",
    getBookDetailsValue: (bkDetails: BookDetails) =>
      bkDetails.reservedBooksCount,
    getLink: (user: User | undefined) => `/users/${user?.userID}/reserved`,
  },
  {
    label: "Books Checked Out",
    getBookDetailsValue: (bkDetails: BookDetails) =>
      bkDetails.checkedOutBooksCount,
    getLink: (user: User | undefined) => `/users/${user?.userID}/checkedout`,
  },
  {
    label: "Wishlisted Books",
    getBookDetailsValue: (bkDetails: BookDetails) =>
      bkDetails.wishlistBooks.length,
    getLink: (user: User | undefined) => `/users/${user?.userID}/wishlists`,
  },
  {
    label: "Completed Books",
    getBookDetailsValue: (bkDetails: BookDetails) =>
      bkDetails.completedBooksList.length,
    getLink: (user: User | undefined) => `/users/${user?.userID}/completed`,
  },
];
