import { BookSortValue, SortOrder } from "@/constants/GlobalConstants";
import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface predictiveAnalysisHookProps {}

interface predictiveAnalysisHook {
  bookList: Book[];
  sortByOrder: SortOrder;
  sortByValue: BookSortValue;
  totalPages: number;
  pageNumber: number;
  rowsPerPage: number;
  handleRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePageNumber: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ) => void;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
}

export const usePredictiveAnalysis =
  ({}: predictiveAnalysisHookProps): predictiveAnalysisHook => {
    // pagination related
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const [bookList, setBookList] = useState<Book[]>([]);
    const [sortByValue, setSortByValue] = useState<BookSortValue>(
      BookSortValue.wishlistCount
    );
    const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);

    useEffect(() => {
      setBookList(mockBooks);
    });

    const handleSortValue = (event: SelectChangeEvent): void => {
      event.target.value && setSortByValue(event.target.value as BookSortValue);
    };
    const handleSortOrder = (event: SelectChangeEvent): void => {
      (event.target.value === SortOrder.asc ||
        event.target.value === SortOrder.desc) &&
        setSortByOrder(event.target.value as SortOrder);
    };

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
      totalPages: -1,
      sortByOrder,
      sortByValue,
      pageNumber,
      rowsPerPage,
      handleRowsPerPage,
      handlePageNumber,
      handleSortOrder,
      handleSortValue,
    };
  };
