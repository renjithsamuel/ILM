import { Book } from "@/entity/Book/Book";
import { BookKeyValues } from "@/types/GlobalTypes";
import dayjs from "dayjs";

export const globalConstants = {
  debounceDelay: 250,
  snackBarDelay: 5000,
};

export const sideMenuItems = {
  // patrons
  BookShelf: { name: "Book Shelf", link: "/bookshelf" },
  MyBooks: { name: "My Books", link: "/mybooks" },
  WishLists: { name: "Wishlists", link: "/wishlists" },
  // librarian
  Dashboard: { name: "Dashboard", link: "/dashboard" },
  Transactions: { name: "Transactions", link: "/transactions" },
  PredictiveAnalysis: {
    name: "Predictive Analysis",
    link: "/predictive-analysis",
  },
  // both
  Users: { name: "Users", link: "/users" },
  AllBooks: { name: "All Books", link: "/allbooks" },
  Settings: { name: "Settings", link: "/settings" },
};

export const PageSeparation = {
  LibrarianPages: [
    "/",
    "/dashboard",
    "/transactions",
    "/predictive-analysis",
    "/users",
    "/allbooks",
    "/settings",
  ],
  PatronPages: [
    "/",
    "/bookshelf",
    "/mybooks",
    "/wishlists",
    "/users",
    "/allbooks",
    "/settings",
  ],
};

export const bookKeyValues: BookKeyValues[] = [
  {
    name: "Title",
    key: "title",
    get: (book: Book) => book?.title?.slice(0, 20) + "..",
  },
  {
    name: "Author",
    key: "author",
    get: (book: Book) => book?.author?.slice(0, 20) + "..",
  },
  { name: "Genre", key: "subject", get: (book: Book) => book.genre },
  {
    name: "Published On",
    key: "publishedDate",
    get: (book: Book) => dayjs(book.publishedDate).format("MMMM D, YYYY"),
  },
  {
    name: "Shelf",
    key: "shelfNumber",
    get: (book: Book) => book?.shelfNumber?.toString() ?? "Not Available",
  },
  {
    name: "Description",
    key: "desc",
    get: (book: Book) => {
      const words = book?.desc?.split(" ");
      return words?.slice(0, 8).join(" ");
    },
  },
];

export const singleBookKeyValues: BookKeyValues[] = [
  {
    name: "Title",
    key: "title",
    get: (book: Book) => book?.title?.slice(0, 50) + "..",
  },
  { name: "Author", key: "author", get: (book: Book) => book.author },
  { name: "Genre", key: "subject", get: (book: Book) => book.genre },
  {
    name: "Published Date",
    key: "publishedDate",
    get: (book: Book) => dayjs(book.publishedDate).format("MMMM D, YYYY"),
  },
  {
    name: "Shelf",
    key: "shelfNumber",
    get: (book: Book) => book?.shelfNumber?.toString() ?? "Not Available",
  },
  {
    name: "Description",
    key: "desc",
    get: (book: Book) => {
      const words = book?.desc?.split(" ");
      return words?.slice(0, 20).join(" ");
    },
  },
];

export enum UserBookDetailType {
  Name = "name",
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
  rating = "rating",
  reviewCount = "reviewCount",
  username = "username",
  email = "email",
  userViews = "userViews",
}

export enum SearchByValue {
  title = "title",
  author = "author",
  genre = "genre",
  isbn = "isbn", // todo handle this
  username = "username",
  email = "email",
}

export enum TransactionSortValue {
  returnedOn = "returnedOn",
  checkedoutOn = "checkedoutOn",
  reservedOn = "reservedOn",
  fineAmount = "fineAmount",
}

export enum ReviewSortValue {
  likes = "likes",
  newest = "newest",
  oldest = "oldest",
}

// todo add search for review and checkout

export enum EntityTypes {
  UserEntity = "user",
  BookEntity = "book",
  BookAndUser = "userAndBook",
  BookDetailsEntity = "bookDetails",
}
