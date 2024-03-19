import { useGetNewBooksGoogleAPI } from "@/api/Book/getNewBooksGoogle";
import {
  BookSortValue,
  SortOrder,
  SortPresence,
} from "@/constants/GlobalConstants";
import { GoogleOrderByValues } from "@/constants/GoogleAPI";
import { usePageContext } from "@/context/PageContext";
import { Book } from "@/entity/Book/Book";
import { SelectChangeEvent } from "@mui/material";
import {
  useEffect,
  useState,
} from "react";

interface allBooksHookProps {}

interface allBooksHook {
  totalItems: number;
  bookList: Book[] | undefined;
  isGetNewAllBooksLoading: boolean;
  pageNumber: number;
  rowsPerPage: number;
  handleRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePageNumber: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ) => void;
}

export const useAllBooks = ({}: allBooksHookProps): allBooksHook => {
  const { setSnackBarError } = usePageContext();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortByGoogleValue, setSortByGoogleValue] =
    useState<GoogleOrderByValues>(GoogleOrderByValues.newest);
  // Fetch books from Google API
  const { data: getNewAllBooksData, isLoading : isGetNewAllBooksLoading,isError: isgetNewAllBooksDataError } =
    useGetNewBooksGoogleAPI({
      limit: rowsPerPage,
      orderBy: sortByGoogleValue,
      page: pageNumber,
    });

  const handleRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (event.target.value) {
      setRowsPerPage(Number.parseInt(event.target.value, 10));
      setPageNumber(1); // Reset page number when rows per page changes
    }
  };

  const handlePageNumber = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ): void => {
    if (val) {
      setPageNumber(val);
    }
  };

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
    bookList: getNewAllBooksData?.data.books,
    totalItems: getNewAllBooksData?.data.totalPages || -1,
    isGetNewAllBooksLoading,
    pageNumber,
    rowsPerPage,
    handleRowsPerPage,
    handlePageNumber,
  };
};
