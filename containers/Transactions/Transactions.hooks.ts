import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";

interface transactionsHookProps {}

interface transactionsHook {
  pendingUsers: User[];
}

export const useTransactions =
  ({}: transactionsHookProps): transactionsHook => {
    // fetch users with pending books
    const mockUserMock = mockUsers.sort(
      (a, b) =>
        a.bookDetails.pendingBooksCount - b.bookDetails.pendingBooksCount
    );

    return {
      pendingUsers: mockUserMock,
    };
  };
