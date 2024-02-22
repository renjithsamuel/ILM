import { BookGenre } from "@/constants/BookGenre";
import { mockBook } from "../Book/Book.mock";
import { BookDetails } from "./UserBookDetails";

export const mockbookDetails: BookDetails = {
  userID: "123456",
  hasPendingBooks: true,
  pendingBooksCount: 2,
  pendingBooksList: [mockBook.ID],
  checkedOutBooksCount: 2,
  checkedOutBookList: [mockBook.ID],
  reservedBooksCount: 2,
  reservedBookList: [mockBook.ID],
  wishlistBooks: [mockBook.ID],
  favoriteGenres: [BookGenre.Adventure, BookGenre.ScienceFiction],
};

export const mockbookDetailsArray: BookDetails[] = [
  {
    userID: "123456",
    hasPendingBooks: true,
    pendingBooksCount: 10,
    pendingBooksList: [mockBook.ID],
    checkedOutBooksCount: 30,
    checkedOutBookList: [mockBook.ID],
    reservedBooksCount: 10,
    reservedBookList: [mockBook.ID],
    wishlistBooks: [mockBook.ID],
    favoriteGenres: [BookGenre.Adventure, BookGenre.ScienceFiction],
  },
  {
    userID: "123457",
    hasPendingBooks: true,
    pendingBooksCount: 20,
    pendingBooksList: [mockBook.ID],
    checkedOutBooksCount: 20,
    checkedOutBookList: [mockBook.ID],
    reservedBooksCount: 30,
    reservedBookList: [mockBook.ID],
    wishlistBooks: [mockBook.ID],
    favoriteGenres: [BookGenre.Adventure, BookGenre.ScienceFiction],
  },
  {
    userID: "123458",
    hasPendingBooks: true,
    pendingBooksCount: 30,
    pendingBooksList: [mockBook.ID],
    checkedOutBooksCount: 10,
    checkedOutBookList: [mockBook.ID],
    reservedBooksCount: 20,
    reservedBookList: [mockBook.ID],
    wishlistBooks: [mockBook.ID],
    favoriteGenres: [BookGenre.Adventure, BookGenre.ScienceFiction],
  },
];
