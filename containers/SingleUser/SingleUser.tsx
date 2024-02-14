import { PendingUserItem } from "@/components/PendingUserItem/PendingUserItem";
import { useSingleUser } from "./SingleUser.hooks";
import { Box } from "@mui/material";
import { useSingleUserStyles } from "./SingleUser.styles";

interface singleUserParams {
  // book: Book;
}

export const SingleUser = ({}: singleUserParams) => {
  const { pendingUsers } = useSingleUser({});
  const classes = useSingleUserStyles();

  return (
    <Box className={classes.singleUserRoot}>
      
    </Box>
  );
};
