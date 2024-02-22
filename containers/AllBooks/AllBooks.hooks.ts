import {
  BookSortValue,
  SortOrder,
  UserBookDetailType,
} from "@/constants/GlobalConstants";
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
  bookList: Book[];
  sortByOrder: SortOrder;
  sortByValue: BookSortValue;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
}

export const useAllBooks = ({}: allBooksHookProps): allBooksHook => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [sortByValue, setSortByValue] = useState<BookSortValue>(
    BookSortValue.wishlistCount
  );
  const [sortByOrder, setSortByOrder] = useState<
    SortOrder.asc | SortOrder.desc
  >(SortOrder.asc);

  // get all books
  // give full freedom to sort from
  useEffect(() => {
    const tempBookList: Book[] = mockBooks.sort((a, b) => {
      return a && b && sortHelper(a, b, sortByOrder, sortByValue);
    });
    tempBookList && tempBookList.length > 0 && setBookList(tempBookList);
    console.log(sortByOrder, sortByValue, tempBookList);
  }, [sortByOrder, sortByValue]);

  // sorting
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

const sortHelper = (
  book1: Book,
  book2: Book,
  sortByOrder: SortOrder,
  sortByValue: BookSortValue
): number => {
  let val: number;
  switch (sortByValue) {
    case BookSortValue.author:
      if (sortByOrder === SortOrder.asc)
        val = book1.author > book2.author ? 1 : -1;
      else val = book2.author > book1.author ? 1 : -1;
      break;

    case BookSortValue.booksLeft:
      if (sortByOrder === SortOrder.asc)
        val = book2.booksLeft - book1.booksLeft;
      else val = book1.booksLeft - book2.booksLeft;
      break;

    case BookSortValue.genre:
      if (sortByOrder === SortOrder.asc)
        val = book1.genre > book2.genre ? 1 : -1;
      else val = book2.genre > book1.genre ? 1 : -1;
      break;

    case BookSortValue.publishedDate:
      if (sortByOrder === SortOrder.asc)
        val = book1.publishedDate > book2.publishedDate ? 1 : -1;
      else val = book2.publishedDate > book1.publishedDate ? 1 : -1;
      break;

    case BookSortValue.shelfNumber:
      if (sortByOrder === SortOrder.asc)
        val = book1.shelfNumber - book2.shelfNumber;
      else val = book2.shelfNumber - book1.shelfNumber;
      break;

    case BookSortValue.title:
      if (sortByOrder === SortOrder.asc)
        val = book1.title > book2.title ? 1 : -1;
      else val = book2.title > book1.title ? 1 : -1;
      break;

    case BookSortValue.views:
      if (sortByOrder === SortOrder.asc) val = book2.views - book1.views;
      else val = book1.views - book2.views;
      break;

    case BookSortValue.wishlistCount:
      if (sortByOrder === SortOrder.asc)
        val = book2.wishlistCount - book1.wishlistCount;
      else val = book1.wishlistCount - book2.wishlistCount;
      break;

    default:
      val = 0;
      break;
  }

  return val;
};
