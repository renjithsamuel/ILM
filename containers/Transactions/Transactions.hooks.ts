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
  sortByValue: string;
  sortByOrder: "asc" | "desc";
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
}

export const useTransactions =
  ({}: transactionsHookProps): transactionsHook => {
    const [sortByValue, setSortByValue] = useState<string>("pending");
    const [sortByOrder, setSortByOrder] = useState<"asc" | "desc">("asc");

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
      event.target.value && setSortByValue(event.target.value);
    };
    const handleSortOrder = (event: SelectChangeEvent): void => {
      (event.target.value === "asc" || event.target.value === "desc") &&
        setSortByOrder(event.target.value);
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
    case "pending":
      if (sortByOrder === "asc")
        val = bookDetail1.pendingBooksCount - bookDetail2.pendingBooksCount;
      else val = bookDetail2.pendingBooksCount - bookDetail1.pendingBooksCount;
      break;
    case "reserved":
      if (sortByOrder === "asc")
        val = bookDetail1.reservedBooksCount - bookDetail2.reservedBooksCount;
      else
        val = bookDetail2.reservedBooksCount - bookDetail1.reservedBooksCount;
      break;
    case "checkedOut":
      if (sortByOrder === "asc")
        val =
          bookDetail1.checkedOutBooksCount - bookDetail2.checkedOutBooksCount;
      else
        val =
          bookDetail2.checkedOutBooksCount - bookDetail1.checkedOutBooksCount;
      break;

    default:
      if (sortByOrder === "asc")
        val = bookDetail1.pendingBooksCount - bookDetail2.pendingBooksCount;
      else val = bookDetail2.pendingBooksCount - bookDetail1.pendingBooksCount;
      break;
  }

  return val;
};
