import { useGetAllBooksAPI } from "@/api/Book/getAllBooks";
import {
  BookSortValue,
  SortOrder,
  SortPresence,
  UserBookDetailType,
} from "@/constants/GlobalConstants";
import { usePageContext } from "@/context/PageContext";
import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";
import { User } from "@/entity/User/User";
import { mockUser, mockUsers } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetailsArray } from "@/entity/UserBookDetails/UserBookDetails.mock";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";

interface allBooksHookProps {}

interface allBooksHook {
  sortByPresence: SortPresence;
  bookList: Book[] | undefined;
  sortByOrder: SortOrder;
  sortByValue: BookSortValue;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
  handleSortPresence: (event: SelectChangeEvent) => void;
}

export const useAllBooks = ({}: allBooksHookProps): allBooksHook => {
  const { setSnackBarError } = usePageContext();
  const [sortByValue, setSortByValue] = useState<BookSortValue>(
    BookSortValue.wishlistCount
  );
  const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);
  const [sortByPresence, setSortByPresence] = useState<SortPresence>(
    SortPresence.both
  );

  // fetch all books
  const { data: bookListData, isError: isBooksError } = useGetAllBooksAPI();

  useEffect(() => {
    if (isBooksError) {
      setSnackBarError({
        ErrorMessage: "get books failed!",
        ErrorSeverity: "error",
      });
    }
  }, [isBooksError]);

  // sorting
  const handleSortPresence = (event: SelectChangeEvent): void => {
    event.target.value && setSortByPresence(event.target.value as SortPresence);
  };
  const handleSortValue = (event: SelectChangeEvent): void => {
    event.target.value && setSortByValue(event.target.value as BookSortValue);
  };
  const handleSortOrder = (event: SelectChangeEvent): void => {
    (event.target.value === SortOrder.asc ||
      event.target.value === SortOrder.desc) &&
      setSortByOrder(event.target.value as SortOrder);
  };

  return {
    bookList: bookListData?.data,
    sortByPresence,
    sortByOrder,
    sortByValue,
    handleSortOrder,
    handleSortValue,
    handleSortPresence,
  };
};
