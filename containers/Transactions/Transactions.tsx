import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useTransactions } from "./Transactions.hooks";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTransactionsStyles } from "./Transactions.styles";

interface transactionsParams {
  // book: Book;
}

export const Transactions = ({}: transactionsParams) => {
  const {
    pendingUsers,
    getBookDetails,
    sortByOrder,
    sortByValue,
    handleSortValue,
    handleSortOrder,
  } = useTransactions({});
  const classes = useTransactionsStyles();

  return (
    <Box className={classes.transactionsRoot}>
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
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"reserved"}>Reserved</MenuItem>
            <MenuItem value={"checkedOut"}>Checked Out</MenuItem>
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
            <MenuItem value={"asc"}>Ascending</MenuItem>
            <MenuItem value={"desc"}>Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        {pendingUsers.map((user, index) => {
          return (
            <PendingUserItem
              key={index}
              userID={user.userID}
              userName={user.name}
              bookDetails={getBookDetails(user.userID)}
            />
          );
        })}
      </Box>
    </Box>
  );
};
