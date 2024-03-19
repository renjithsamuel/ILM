import { useCreateAllBookAPI } from "@/api/Book/createAllBooks";
import { useCreateBookAPI } from "@/api/Book/createBook";
import { useGetAllBooksAPI } from "@/api/Book/getAllBooks";
import { useGetAllBooksFromSpecificFromSpecificListAPI } from "@/api/Book/getAllBooksFromSpecificList";
import { useGoogleGetAllBooksAPI } from "@/api/GoogleAPI/getAllBooks";
import {
  BookSortValue,
  SortOrder,
  SortPresence,
  UserBookDetailType,
} from "@/constants/GlobalConstants";
import { GoogleOrderByValues } from "@/constants/GoogleAPI";
import { usePageContext } from "@/context/PageContext";
import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";
import { User } from "@/entity/User/User";
import { mockUser, mockUsers } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetailsArray } from "@/entity/UserBookDetails/UserBookDetails.mock";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface allBooksHookProps {}

interface allBooksHook {
  totalItems: number;
  sortByPresence: SortPresence;
  bookList: Book[] | undefined;
  sortByOrder: SortOrder;
  sortByValue: BookSortValue;
  pageNumber: number;
  rowsPerPage: number;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
  handleSortPresence: (event: SelectChangeEvent) => void;
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
  const [sortByValue, setSortByValue] = useState<BookSortValue>(
    BookSortValue.wishlistCount
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortByGoogleValue, setSortByGoogleValue] =
    useState<GoogleOrderByValues>(GoogleOrderByValues.newest);
  const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);
  const [sortByPresence, setSortByPresence] = useState<SortPresence>(
    SortPresence.both
  );

  // Fetch books from Google API
  const { data: googleBooksListData, isError: isGoogleBooksError } =
    useGoogleGetAllBooksAPI({
      maxResults: rowsPerPage,
      orderBy: sortByGoogleValue,
      startIndex: (pageNumber - 1) * rowsPerPage,
    });

  // Fetch specific books from the database
  const { data: bookListData, isError: isBooksError } =
    useGetAllBooksFromSpecificFromSpecificListAPI(
      { booksList: googleBooksListData?.data?.books?.map((item) => item.ISBN) },
      !!googleBooksListData?.data
    );

  // Create books in the database
  // post all the gotten books
  const { mutateAsync: createAllBooks } = useCreateAllBookAPI();
  // const { mutateAsync : createBook} = useCreateBookAPI()

  // Handle input changes
  const handleSortPresence = useCallback((event: SelectChangeEvent): void => {
    event.target.value && setSortByPresence(event.target.value as SortPresence);
  }, []);

  const handleSortValue = useCallback((event: SelectChangeEvent): void => {
    event.target.value && setSortByValue(event.target.value as BookSortValue);
  }, []);

  const handleSortOrder = useCallback((event: SelectChangeEvent): void => {
    (event.target.value === SortOrder.asc ||
      event.target.value === SortOrder.desc) &&
      setSortByOrder(event.target.value as SortOrder);
  }, []);

  const handleRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (event.target.value) {
      console.log("pageNumber in handleRowsPerPage", pageNumber);
      console.log("rowsPerPage in handleRowsPerPage", rowsPerPage);
      console.log(
        "startIndex in handleRowsPerPage",
        (pageNumber - 1) * rowsPerPage
      );
      setRowsPerPage(Number.parseInt(event.target.value, 10));
      setPageNumber(1); // Reset page number when rows per page changes
    }
  };

  const handlePageNumber = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ): void => {
    if (val) {
      console.log("pageNumber in handlePageNumber", pageNumber);
      console.log("rowsPerPage in handlePageNumber", rowsPerPage);
      console.log(
        "startIndex in handlePageNumber",
        (pageNumber - 1) * rowsPerPage
      );
      setPageNumber(val);
    }
  };

  useEffect(() => {
    if (googleBooksListData?.data) {
      // Perform deep comparison to check if there are new books
      const newData = getNewBooksDatas(
        googleBooksListData?.data.books,
        bookListData?.data
      );

      console.log("newData", newData);

      if (!!newData && newData.length > 0) {
        createAllBooks({ books: newData });
      }
    }
  }, [googleBooksListData?.data, bookListData?.data]);

  // Handle errors
  useEffect(() => {
    if (isGoogleBooksError) {
      setSnackBarError({
        ErrorMessage: "Failed to fetch google books!",
        ErrorSeverity: "error",
      });
    }
  }, [isGoogleBooksError]);

  useEffect(() => {
    if (isBooksError) {
      setSnackBarError({
        ErrorMessage: "Failed to fetch books!",
        ErrorSeverity: "error",
      });
    }
  }, [isBooksError]);

  return {
    bookList: bookListData?.data,
    totalItems: googleBooksListData?.data.totalItems || -1,
    sortByPresence,
    sortByOrder,
    sortByValue,
    pageNumber,
    rowsPerPage,
    handleSortOrder,
    handleSortValue,
    handleSortPresence,
    handleRowsPerPage,
    handlePageNumber,
  };
};

function getNewBooksDatas(
  googleBooks: Book[] | undefined,
  dbBooks: Book[] | undefined
): Book[] {
  let newData: Book[] = [];
  googleBooks?.forEach((googleBook) => {
    const found = dbBooks?.find((dbBook) => dbBook.ISBN === googleBook.ISBN);
    if (!found) {
      newData.push(googleBook);
    }
  });

  return newData;
}
