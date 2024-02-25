import { BookGenre } from "@/constants/BookGenre";
import { IBook } from "../Book/Book";

export interface IBookDetails {
  userID: string;
  hasPendingBooks: boolean;
  pendingBooksCount: number;
  pendingBooksList: string[];
  checkedOutBooksCount: number;
  checkedOutBookList: string[];
  reservedBooksCount: number;
  reservedBookList: string[];
  favoriteGenres: BookGenre[];
  wishlistBooks: string[];
  completedBooksCount: number;
  completedBooksList: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class BookDetails implements IBookDetails {
  readonly userID: string;
  hasPendingBooks: boolean;
  pendingBooksCount: number;
  pendingBooksList: string[];
  checkedOutBooksCount: number;
  checkedOutBookList: string[];
  reservedBooksCount: number;
  reservedBookList: string[];
  favoriteGenres: BookGenre[];
  wishlistBooks: string[];
  completedBooksCount: number;
  completedBooksList: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(bookDetails: IBookDetails) {
    this.userID = bookDetails.userID;
    this.hasPendingBooks = bookDetails.hasPendingBooks;
    this.pendingBooksCount = bookDetails.pendingBooksCount;
    this.pendingBooksList = bookDetails.pendingBooksList;
    this.checkedOutBooksCount = bookDetails.checkedOutBooksCount;
    this.checkedOutBookList = bookDetails.checkedOutBookList;
    this.reservedBooksCount = bookDetails.reservedBooksCount;
    this.reservedBookList = bookDetails.reservedBookList;
    this.favoriteGenres = bookDetails.favoriteGenres;
    this.wishlistBooks = bookDetails.wishlistBooks;
    this.completedBooksCount = bookDetails.completedBooksCount;
    this.completedBooksList = bookDetails.completedBooksList;
    this.createdAt = bookDetails.createdAt;
    this.updatedAt = bookDetails.updatedAt;
  }
}
