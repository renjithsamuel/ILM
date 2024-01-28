import { Book, IBook } from "./Book";

const bookData: IBook = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  subject: "Classic Literature",
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
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    subject: "Classic Literature",
    publishedDate: "1925",
    desc: "A novel about the American Dream",
    previewLink:
      "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
    coverImage:
      "http://books.google.com/books/content?id=f2ieoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    subject: "Fiction",
    publishedDate: "1960",
    desc: "A story of racial injustice and moral growth",
    previewLink:
      "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
    coverImage:
      "http://books.google.com/books/content?id=f2ieoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  },
  {
    title: "1984",
    author: "George Orwell",
    subject: "Dystopian Fiction",
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
