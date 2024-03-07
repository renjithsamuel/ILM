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
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
}

export const usePredictiveAnalysis =
  ({}: predictiveAnalysisHookProps): predictiveAnalysisHook => {
    const [bookList, setBookList] = useState<Book[]>([]);
    const [sortByValue, setSortByValue] = useState<BookSortValue>(
      BookSortValue.wishlistCount,
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

    return {
      bookList,
      sortByOrder,
      sortByValue,
      handleSortOrder,
      handleSortValue,
    };
  };
