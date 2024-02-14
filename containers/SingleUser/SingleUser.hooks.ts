import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";

interface singleUserHookProps {}

interface singleUserHook {
  pendingUsers: User[];
}

export const useSingleUser =
  ({}: singleUserHookProps): singleUserHook => {
    // fetch users with pending books
    const mockUserMock = mockUsers.sort(
      (a, b) =>
        a.bookDetails.pendingBooksCount - b.bookDetails.pendingBooksCount
    );

    return {
      pendingUsers: mockUserMock,
    };
  };
