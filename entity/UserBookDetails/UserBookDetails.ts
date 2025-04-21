export interface IBookDetails {
  userID: string;
  reservedBooksCount: number;
  reservedBookList: string[];
  checkedOutBooksCount: number;
  checkedOutBookList: string[];
  pendingBooksCount: number;
  pendingBooksList: string[];
  completedBooksCount: number;
  completedBooksList: string[];
  favoriteGenres: string[];
  wishlistBooks: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class BookDetails implements IBookDetails {
  readonly userID: string;
  reservedBooksCount: number;
  reservedBookList: string[];
  checkedOutBooksCount: number;
  checkedOutBookList: string[];
  pendingBooksCount: number;
  pendingBooksList: string[];
  completedBooksCount: number;
  completedBooksList: string[];
  favoriteGenres: string[];
  wishlistBooks: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(bookDetails: IBookDetails) {
    this.userID = bookDetails.userID;
    this.reservedBooksCount = bookDetails.reservedBooksCount;
    this.reservedBookList = bookDetails.reservedBookList;
    this.checkedOutBooksCount = bookDetails.checkedOutBooksCount;
    this.checkedOutBookList = bookDetails.checkedOutBookList;
    this.completedBooksCount = bookDetails.completedBooksCount;
    this.completedBooksList = bookDetails.completedBooksList;
    this.pendingBooksCount = bookDetails.pendingBooksCount;
    this.pendingBooksList = bookDetails.pendingBooksList;
    this.favoriteGenres = bookDetails.favoriteGenres;
    this.wishlistBooks = bookDetails.wishlistBooks;
    this.createdAt = bookDetails.createdAt;
    this.updatedAt = bookDetails.updatedAt;
  }
}

// reserved - books that are reseved but yet to be checked out
// checkedOut - books that are checked out
// pending - books that are checkedout but are yet to be added review or returned
// completed - books that are both added review and returned
