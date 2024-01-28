import { Book } from "@/entity/Book/Book";
import { BookKeyValues } from "@/types/GlobalTypes";

export const globalConstants = {
  debounceDelay: 250,
  snackBarDelay: 5000,
};

export const sideMenuItems = {
  // patrons
  BookShelf: { name: "Book Shelf", link: "bookshelf" },
  MyBooks: { name: "My Books", link: "mybooks" },
  // librarian
  Dashboard: { name: "Dashboard", link: "dashboard" },
  WishLists: { name: "Wishlists", link: "wishlists" },
  Transactions: { name: "Transactions", link: "transactions" },
  // both
  Settings: { name: "Settings", link: "settings" },
};

export const bookKeyValues: BookKeyValues[] = [
  { name: "Title", key: "title", get: (book: Book) => book.title },
  { name: "Author", key: "author", get: (book: Book) => book.author },
  { name: "Genre", key: "subject", get: (book: Book) => book.subject },
  {
    name: "Published Date",
    key: "publishedDate",
    get: (book: Book) => book.publishedDate,
  },
  { name: "Description", key: "desc", get: (book: Book) => book.desc },
];
