import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useTransactions } from "./Transactions.hooks";
import { Box } from "@mui/material";
import { useTransactionsStyles } from "./Transactions.styles";

interface transactionsParams {
  // book: Book;
}

export const Transactions = ({}: transactionsParams) => {
  const { pendingUsers } = useTransactions({});
  const classes = useTransactionsStyles();

  return (
    <Box className={classes.transactionsRoot}>
      {pendingUsers.map((user, index) => {
        return (
          <PendingUserItem
            key={index}
            userID={user.userID}
            userName={user.name}
            bookDetails={user.bookDetails}
          />
        );
      })}
    </Box>
  );
};
