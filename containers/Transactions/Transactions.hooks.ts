import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetailsArray } from "@/entity/UserBookDetails/UserBookDetails.mock";

interface transactionsHookProps {}

interface transactionsHook {
  pendingUsers: User[];
  getBookDetails: (userID: string) => BookDetails | undefined;
}

export const useTransactions =
  ({}: transactionsHookProps): transactionsHook => {
    // represents book details array
    const mockBookDetailsArrayMock = mockbookDetailsArray;
    // fetch users
    const mockUserMock = mockUsers.sort((a, b) => {
      const aBookDetails = mockBookDetailsArrayMock.find(
        (bkDetails) => bkDetails.userID === a.userID
      );
      const bBookDetails = mockBookDetailsArrayMock.find(
        (bkDetails) => bkDetails.userID === b.userID
      );
      return aBookDetails && bBookDetails
        ? aBookDetails.pendingBooksCount - bBookDetails.pendingBooksCount
        : -1;
    });

    // const get

    const getBookDetails = (userID: string) => {
      const bookDetails = mockBookDetailsArrayMock.find((bkDetails) => bkDetails.userID === userID);
      return bookDetails && bookDetails
    };

    return {
      pendingUsers: mockUserMock,
      getBookDetails,
    };
  };
