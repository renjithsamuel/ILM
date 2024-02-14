import { BookGenre } from "@/constants/BookGenre";
import { Book, IBook } from "./Book";

const bookData: IBook = {
  ID: "3e74718b-3855-43ba-ae2c-4be8ccc79026",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: BookGenre.Travel,
  publishedDate: "1925",
  desc: "A novel about the American Dream",
  previewLink:
    "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
  coverImage:
    "http://books.google.com/books/content?id=f2ieoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
};

export const mockBook = new Book(bookData);

const mockBooksInterfaceArray: IBook[] = [
  {
    ID: "3e74718b-3855-43ba-ae2c-4be8ccc79027",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: BookGenre.Adventure,
    publishedDate: "1925",
    desc: "A novel about the American Dream",
    previewLink:
      "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
    coverImage:
      "http://books.google.com/books/content?id=f2ieoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  },
  {
    ID: "3e74718b-3855-43ba-ae2c-4be8ccc79028",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: BookGenre.ScienceFiction,
    publishedDate: "1960",
    desc: "A story of racial injustice and moral growth",
    previewLink:
      "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
    coverImage:
      "http://books.google.com/books/content?id=f2ieoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  },
  {
    ID: "3e74718b-3855-43ba-ae2c-4be8ccc79029",
    title: "1984",
    author: "George Orwell",
    genre: BookGenre.Biography,
    publishedDate: "1949",
    desc: "A novel depicting a totalitarian society",
    previewLink:
      "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
    coverImage:
      "http://books.google.com/books/content?id=f2ieoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  },
];

export const mockBooks: Book[] = mockBooksInterfaceArray.map(
  (book) => new Book(book)
);
