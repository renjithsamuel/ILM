import { BookGenre } from "@/constants/BookGenre";

export interface IBook {
  ID: string;
  ISBN: string;
  title: string;
  author: string;
  genre: BookGenre;
  publishedDate: string;
  desc: string;
  previewLink?: string;
  coverImage: string;
  shelfNumber: number;
  inLibrary: boolean;
  views: number;
  booksLeft: number;
  wishlistCount: number;
}

export class Book implements IBook {
  ID: string;
  ISBN: string;
  title: string;
  author: string;
  genre: BookGenre;
  publishedDate: string;
  desc: string;
  previewLink?: string;
  coverImage: string;
  shelfNumber: number;
  inLibrary: boolean;
  views: number;
  booksLeft: number;
  wishlistCount: number;

  constructor(book: IBook) {
    this.ID = book.ID;
    this.title = book.title;
    this.ISBN = book.ISBN;
    this.author = book.author;
    this.genre = book.genre;
    this.publishedDate = book.publishedDate;
    this.desc = book.desc;
    this.previewLink = book.previewLink;
    this.coverImage = book.coverImage;
    this.shelfNumber = book.shelfNumber;
    this.inLibrary = book.inLibrary;
    this.views = book.views;
    this.booksLeft = book.booksLeft;
    this.wishlistCount = book.wishlistCount;
  }
}
