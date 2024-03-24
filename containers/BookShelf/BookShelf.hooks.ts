import { BookSortValue, SortOrder } from "@/constants/GlobalConstants";
import { usePageContext } from "@/context/PageContext";
import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";
import { useGetRecommendedBooksAPI } from "@/goconnection/DataAnalysis/getRecommendedBooks";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface bookShelfHookProps {}

interface bookShelfHook {
  bookList: Book[];
  totalPages: number;
  pageNumber: number;
  rowsPerPage: number;
  isRecommendedbooksLoading: boolean;
  handleRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePageNumber: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ) => void;
}

export const useBookShelf = ({}: bookShelfHookProps): bookShelfHook => {
  // pagination related
  const { setSnackBarError } = usePageContext();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [bookList, setBookList] = useState<Book[]>([]);

  const {
    data: recommendedbooksResponse,
    isError: isRecommendedbooksError,
    isLoading : isRecommendedbooksLoading,
    isSuccess: isRecommendedbooksSuccess,
  } = useGetRecommendedBooksAPI({
    limit: rowsPerPage,
    page: pageNumber,
  });

  useEffect(() => {
    if (isRecommendedbooksError) {
      setSnackBarError({
        ErrorMessage: "fetch book failed!",
        ErrorSeverity: "error",
      });
    }
  }, [isRecommendedbooksError]);

  useEffect(() => {
    if (isRecommendedbooksSuccess && recommendedbooksResponse?.data.books) {
      setBookList(recommendedbooksResponse?.data.books);
    }
  }, [isRecommendedbooksSuccess]);

  // pagination
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

  return {
    bookList,
    totalPages: recommendedbooksResponse?.data.totalPages ?? -1,
    pageNumber,
    rowsPerPage,
    isRecommendedbooksLoading,
    handleRowsPerPage,
    handlePageNumber,
  };
};
