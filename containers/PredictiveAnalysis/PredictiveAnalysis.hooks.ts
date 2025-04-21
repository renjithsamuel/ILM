import { BookSortValue, SortOrder } from "@/constants/GlobalConstants";
import { usePageContext } from "@/context/PageContext";
import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";
import { useGetPredictiveAnalysisAPI } from "@/goconnection/DataAnalysis/getPredictiveAnalysis";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface predictiveAnalysisHookProps {}

interface predictiveAnalysisHook {
  bookList: Book[];
  totalPages: number;
  pageNumber: number;
  rowsPerPage: number;
  isPredictiveAnalysisLoading: boolean;
  handleRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handlePageNumber: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number,
  ) => void;
}

export const usePredictiveAnalysis =
  ({}: predictiveAnalysisHookProps): predictiveAnalysisHook => {
    // pagination related
    const { setSnackBarError } = usePageContext();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const [bookList, setBookList] = useState<Book[]>([]);
    const {
      data: predictiveAnalysisBooksResponse,
      isError: isPredictiveAnalysisError,
      isSuccess: isPredictiveAnalysisSuccess,
      isLoading: isPredictiveAnalysisLoading,
    } = useGetPredictiveAnalysisAPI({
      limit: rowsPerPage,
      page: pageNumber,
    });

    useEffect(() => {
      if (isPredictiveAnalysisError) {
        setSnackBarError({
          ErrorMessage: "fetch book failed!",
          ErrorSeverity: "error",
        });
      }
    }, [isPredictiveAnalysisError]);

    useEffect(() => {
      if (
        isPredictiveAnalysisSuccess &&
        predictiveAnalysisBooksResponse?.data.books
      ) {
        setBookList(predictiveAnalysisBooksResponse?.data.books);
      }
    }, [isPredictiveAnalysisSuccess]);

    // pagination
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

    return {
      bookList,
      totalPages: predictiveAnalysisBooksResponse?.data.totalPages ?? -1,
      pageNumber,
      rowsPerPage,
      isPredictiveAnalysisLoading,
      handleRowsPerPage,
      handlePageNumber,
    };
  };
