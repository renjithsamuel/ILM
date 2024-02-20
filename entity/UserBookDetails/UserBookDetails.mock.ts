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
  mockbookDetails,
  mockbookDetails,
  mockbookDetails,
];
