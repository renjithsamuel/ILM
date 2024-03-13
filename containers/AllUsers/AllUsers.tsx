import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useAllUsers } from "./AllUsers.hooks";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAllUsersStyles } from "./AllUsers.styles";
import { SortOrder, UserBookDetailType } from "@/constants/GlobalConstants";

interface allUsersParams {
  // book: Book;
}

export const AllUsers = ({}: allUsersParams) => {
  const {
    pendingUsers,
    sortByOrder,
    sortByValue,
    handleSortValue,
    handleSortOrder,
  } = useAllUsers({});
  const classes = useAllUsersStyles();

  return (
    <Box className={classes.allUsersRoot}>
      <Box className={classes.sortByContainer}>
        {/* sort by */}
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="demo-controlled-open-select-label">
            Sort By
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={sortByValue}
            label="Sort By"
            onChange={handleSortValue}
          >
            <MenuItem value={UserBookDetailType.Pending}>Pending</MenuItem>
            <MenuItem value={UserBookDetailType.Reserved}>Reserved</MenuItem>
            <MenuItem value={UserBookDetailType.CheckedOut}>
              Checked Out
            </MenuItem>
            <MenuItem value={UserBookDetailType.Completed}>Completed</MenuItem>
            <MenuItem value={UserBookDetailType.WishLists}>Wishlist</MenuItem>
          </Select>
        </FormControl>
        {/* order */}
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="demo-controlled-open-select-label">
            Order By
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={sortByOrder}
            label="Order By"
            onChange={handleSortOrder}
          >
            <MenuItem value={SortOrder.asc}>Ascending</MenuItem>
            <MenuItem value={SortOrder.desc}>Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        {pendingUsers &&
          pendingUsers.length > 0 &&
          pendingUsers?.map((user) => {
            return (
              <PendingUserItem
                key={user.userID}
                userID={user.userID}
                userName={user.name}
                email={user.email}
                bookDetails={user.bookDetails}
                sortByValue={sortByValue}
              />
            );
          })}
      </Box>
    </Box>
  );
};
