import { useGetNewBooksGoogleAPI } from "@/goconnection/Book/getNewBooksGoogle";
import {
  BookSortValue,
  SortOrder,
  SortPresence,
} from "@/constants/GlobalConstants";
import { GoogleOrderByValues } from "@/constants/GoogleAPI";
import { usePageContext } from "@/context/PageContext";
import { Book } from "@/entity/Book/Book";
import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

interface allBooksHookProps {}

interface allBooksHook {
  totalItems: number;
  bookList: Book[];
  isGetNewAllBooksLoading: boolean;
  pageNumber: number;
  rowsPerPage: number;
  sortByOrder: SortOrder;
  sortByValue: BookSortValue;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
  handleRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handlePageNumber: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number,
  ) => void;
}

export const useAllBooks = ({}: allBooksHookProps): allBooksHook => {
  const { setSnackBarError } = usePageContext();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [bookList, setBookList] = useState<Book[]>([]);
  const [sortByValue, setSortByValue] = useState<BookSortValue>(
    BookSortValue.wishlistCount,
  );
  const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);
  // Fetch books from Google API
  const {
    data: getNewAllBooksData,
    isLoading: isGetNewAllBooksLoading,
    isError: isgetNewAllBooksDataError,
  } = useGetNewBooksGoogleAPI({
    limit: rowsPerPage,
    sortBy: sortByValue,
    orderBy: sortByOrder,
    page: pageNumber,
  });

  useMemo(() => {
    if (!!getNewAllBooksData?.data.books) {
      setBookList(getNewAllBooksData?.data.books);
    }
  }, [getNewAllBooksData?.data.books]);

  const handleRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (event.target.value) {
      setRowsPerPage(Number.parseInt(event.target.value, 10));
      setPageNumber(1); // Reset page number when rows per page changes
    }
  };

  const handlePageNumber = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number,
  ): void => {
    if (val) {
      setPageNumber(val);
    }
  };

  const handleSortValue = useCallback((event: SelectChangeEvent): void => {
    event.target.value && setSortByValue(event.target.value as BookSortValue);
  }, []);

  const handleSortOrder = useCallback((event: SelectChangeEvent): void => {
    (event.target.value === SortOrder.asc ||
      event.target.value === SortOrder.desc) &&
      setSortByOrder(event.target.value as SortOrder);
  }, []);

  // Handle error

  useEffect(() => {
    if (isgetNewAllBooksDataError) {
      setSnackBarError({
        ErrorMessage: "Failed to fetch books!",
        ErrorSeverity: "error",
      });
    }
  }, [isgetNewAllBooksDataError]);

  return {
    bookList,
    totalItems: getNewAllBooksData?.data.totalPages || -1,
    isGetNewAllBooksLoading,
    pageNumber,
    rowsPerPage,
    sortByOrder,
    sortByValue,
    handleSortOrder,
    handleSortValue,
    handleRowsPerPage,
    handlePageNumber,
  };
};
