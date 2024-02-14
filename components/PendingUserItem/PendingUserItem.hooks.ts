import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";

interface pendingUserItemHookProps {}

interface pendingUserItemHook {
  pendingUsers: User[];
}

export const usePendingUserItem =
  ({}: pendingUserItemHookProps): pendingUserItemHook => {
    // fetch users with pending books
    const mockUserMock = mockUsers
      .filter(
        (user) =>
          user.bookDetails.hasPendingBooks &&
          user.bookDetails.pendingBooksCount > 0
      )
      .sort(
        (a, b) =>
          a.bookDetails.pendingBooksCount - b.bookDetails.pendingBooksCount
      );

    return {
      pendingUsers: mockUserMock,
    };
  };
