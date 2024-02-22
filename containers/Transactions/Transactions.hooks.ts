import { SortOrder, UserBookDetailType } from "@/constants/GlobalConstants";
import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetailsArray } from "@/entity/UserBookDetails/UserBookDetails.mock";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface transactionsHookProps {}

interface transactionsHook {
  pendingUsers: User[];
  getBookDetails: (userID: string) => BookDetails | undefined;
  sortByValue: UserBookDetailType;
  sortByOrder: SortOrder;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
}

export const useTransactions =
  ({}: transactionsHookProps): transactionsHook => {
    const [sortByValue, setSortByValue] = useState<UserBookDetailType>(
      UserBookDetailType.Pending
    );
    const [sortByOrder, setSortByOrder] = useState<
      SortOrder.asc | SortOrder.desc
    >(SortOrder.asc);

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
        ? sortHelper(aBookDetails, bBookDetails, sortByOrder, sortByValue)
        : -1;
    });

    // const get
    const getBookDetails = (userID: string) => {
      const bookDetails = mockBookDetailsArrayMock.find(
        (bkDetails) => bkDetails.userID === userID
      );
      return bookDetails && bookDetails;
    };

    // sorting
    const handleSortValue = (event: SelectChangeEvent): void => {
      event.target.value &&
        setSortByValue(event.target.value as UserBookDetailType);
    };
    const handleSortOrder = (event: SelectChangeEvent): void => {
      (event.target.value === SortOrder.asc ||
        event.target.value === SortOrder.asc) &&
        setSortByOrder(event.target.value as SortOrder);
    };

    return {
      pendingUsers: mockUserMock,
      getBookDetails,
      sortByValue,
      sortByOrder,
      handleSortValue,
      handleSortOrder,
    };
  };

const sortHelper = (
  bookDetail1: BookDetails,
  bookDetail2: BookDetails,
  sortByOrder: string,
  sortByValue: string
): number => {
  let val;
  switch (sortByValue) {
    case UserBookDetailType.Pending:
      if (sortByOrder === SortOrder.asc)
        val = bookDetail1.pendingBooksCount - bookDetail2.pendingBooksCount;
      else val = bookDetail2.pendingBooksCount - bookDetail1.pendingBooksCount;
      break;
    case UserBookDetailType.Reserved:
      if (sortByOrder === SortOrder.asc)
        val = bookDetail1.reservedBooksCount - bookDetail2.reservedBooksCount;
      else
        val = bookDetail2.reservedBooksCount - bookDetail1.reservedBooksCount;
      break;
    case UserBookDetailType.CheckedOut:
      if (sortByOrder === SortOrder.asc)
        val =
          bookDetail1.checkedOutBooksCount - bookDetail2.checkedOutBooksCount;
      else
        val =
          bookDetail2.checkedOutBooksCount - bookDetail1.checkedOutBooksCount;
      break;

    case UserBookDetailType.Completed:
      if (sortByOrder === SortOrder.asc)
        val = bookDetail1.completedBooksCount - bookDetail2.completedBooksCount;
      else
        val = bookDetail2.completedBooksCount - bookDetail1.completedBooksCount;
      break;

    case UserBookDetailType.WishLists:
      if (sortByOrder === SortOrder.asc)
        val =
          bookDetail1.wishlistBooks.length - bookDetail2.wishlistBooks.length;
      else
        val =
          bookDetail2.wishlistBooks.length - bookDetail1.wishlistBooks.length;
      break;

    default:
      if (sortByOrder === SortOrder.asc)
        val = bookDetail1.pendingBooksCount - bookDetail2.pendingBooksCount;
      else val = bookDetail2.pendingBooksCount - bookDetail1.pendingBooksCount;
      break;
  }

  return val;
};
