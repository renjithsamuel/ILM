import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useTransactions } from "./Transactions.hooks";
import { Box } from "@mui/material";
import { useTransactionsStyles } from "./Transactions.styles";

interface transactionsParams {
  // book: Book;
}

export const Transactions = ({}: transactionsParams) => {
  const { pendingUsers, getBookDetails } = useTransactions({});
  const classes = useTransactionsStyles();

  return (
    <Box className={classes.transactionsRoot}>
      {/* <Box className={classes.sortByContainer}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
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
