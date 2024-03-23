import { mockUser } from "../User/User.mock";
import { Book, IBook } from "./Book";

const bookData: IBook = {
  ID: "3e74718b-3855-43ba-ae2c-4be8ccc79027",
  ISBN: "123456",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "travel",
  publishedDate: new Date(),
  desc: "A novel about the American Dream",
  previewLink:
    "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
  coverImage:
    "https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg",
  shelfNumber: 12,
  inLibrary: true,
  booksLeft: 2,
  views: 2,
  wishlistCount: 2,
  reviewCount: 40,
  rating: 4.1,
  createdAt: new Date(),
  updatedAt: new Date(),
  approximateDemand: 20,
  reviewsList: [mockUser.userID],
  wishList: [mockUser.userID],
  viewsList: [mockUser.userID],
};

export const mockBook = new Book(bookData);

const mockBooksInterfaceArray: IBook[] = [
  {
    ID: "3e74718b-3855-43ba-ae2c-4be8ccc79027",
    ISBN: "123456",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "adventure",
    publishedDate: new Date(),
    desc: "A novel about the American Dream",
    previewLink:
      "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
    coverImage:
      "https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg",
    shelfNumber: 12,
    inLibrary: true,
    booksLeft: 3,
    views: 1,
    wishlistCount: 1,
    reviewCount: 20,
    rating: 4.1,
    createdAt: new Date(),
    updatedAt: new Date(),
    approximateDemand: 20,
    reviewsList: [mockUser.userID],
    wishList: [mockUser.userID],
    viewsList: [mockUser.userID],
  },
  {
    ID: "3e74718b-3855-43ba-ae2c-4be8ccc79028",
    ISBN: "123456",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "fiction",
    publishedDate: new Date(),
    desc: "A story of racial injustice and moral growth",
    previewLink:
      "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
    coverImage:
      "https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg",
    shelfNumber: 12,
    inLibrary: true,
    booksLeft: 0,
    views: 2,
    wishlistCount: 2,
    reviewCount: 30,
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date(),
    approximateDemand: 20,
    reviewsList: [mockUser.userID],
    wishList: [mockUser.userID],
    viewsList: [mockUser.userID],
  },
  {
    ID: "3e74718b-3855-43ba-ae2c-4be8ccc79029",
    ISBN: "123456",
    title: "1984",
    author: "George Orwell",
    genre: "biography",
    publishedDate: new Date(),
    desc: "A novel depicting a totalitarian society",
    previewLink:
      "http://books.google.co.in/books?id=f2ieoAEACAAJ&dq=The+Hunger+Games&hl=&cd=1&source=gbs_api",
    coverImage:
      "https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg",
    shelfNumber: 12,
    inLibrary: false,
    booksLeft: 1,
    views: 3,
    rating: 3.5,
    wishlistCount: 3,
    reviewCount: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
    approximateDemand: 20,
    reviewsList: [mockUser.userID],
    wishList: [mockUser.userID],
    viewsList: [mockUser.userID],
  },
];

export const mockBooks: Book[] = mockBooksInterfaceArray.map(
  (book) => new Book(book)
);
