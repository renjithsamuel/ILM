import { Book } from "@/entity/Book/Book";
import { BookKeyValues } from "@/types/GlobalTypes";

export const globalConstants = {
  debounceDelay: 250,
  snackBarDelay: 5000,
};

export const sideMenuItems = {
  // patrons
  BookShelf: { name: "Book Shelf", link: "/bookshelf" },
  MyBooks: { name: "My Books", link: "/mybooks" },
  // librarian
  Dashboard: { name: "Dashboard", link: "/dashboard" },
  WishLists: { name: "Wishlists", link: "/wishlists" },
  Users: { name: "Users", link: "/users" },
  Transactions: { name: "Transactions", link: "/transactions" },
  PredictiveAnalysis: {
    name: "Predictive Analysis",
    link: "/predictive-analysis",
  },
  // both
  AllBooks: { name: "All Books", link: "/allbooks" },
  Settings: { name: "Settings", link: "/settings" },
};

export const bookKeyValues: BookKeyValues[] = [
  { name: "Title", key: "title", get: (book: Book) => book.title },
  { name: "Author", key: "author", get: (book: Book) => book.author },
  { name: "Genre", key: "subject", get: (book: Book) => book.genre },

  {
    name: "Published Date",
    key: "publishedDate",
    get: (book: Book) => book.publishedDate,
  },
  {
    name: "Shelf",
    key: "shelfNumber",
    get: (book: Book) => book?.shelfNumber?.toString() ?? "Not Available",
  },
  { name: "Description", key: "desc", get: (book: Book) => book.desc },
];

export enum UserBookDetailType {
  Reserved = "reserved",
  Pending = "pending",
  CheckedOut = "checkedOut",
  WishLists = "wishLists",
  Completed = "completed",
}

export enum BookSortValue {
  wishlistCount = "wishlistCount",
  views = "views",
  booksLeft = "booksLeft",
  title = "title",
  author = "author",
  genre = "genre",
  publishedDate = "publishedDate",
  shelfNumber = "shelfNumber",
  rating = "rating",
  approximateDemand = "approximateDemand",
  reviewCount = "reviewCount",
}

export enum SortOrder {
  asc = "ascending",
  desc = "descending",
}

export enum SortPresence {
  both = "both",
  inLibrary = "inLibrary",
  others = "others",
}

export enum SearchSortValue {
  wishlistCount = "wishlistCount",
  bookViews = "bookViews",
  booksLeft = "booksLeft",
  title = "title",
  author = "author",
  genre = "genre",
  publishedDate = "publishedDate",
  shelfNumber = "shelfNumber",
  username = "username",
  email = "email",
  userViews = "userViews",
  rating = "rating",
  reviewCount = "reviewCount",
}

export enum TransactionSortValue {
  returnedOn = "Returned On",
  checkedoutOn = "Checkedout On",
  reservedOn = "Reserved On",
  fineAmount = "Fine Amount",
}

export enum EntityTypes {
  UserEntity = "user",
  BookEntity = "book",
  BookAndUser = "userAndBook",
  BookDetailsEntity = "bookDetails",
}
