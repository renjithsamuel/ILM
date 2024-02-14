import { BookGenre } from "@/constants/BookGenre";

export interface IBook {
  ID: string;
  title: string;
  author: string;
  genre: BookGenre;
  publishedDate: string;
  desc: string;
  previewLink?: string;
  coverImage: string;
  shelfNumber?: number;
}

export class Book implements IBook {
  ID: string;
  title: string;
  author: string;
  genre: BookGenre;
  publishedDate: string;
  desc: string;
  previewLink?: string;
  coverImage: string;
  shelfNumber?: number;

  constructor(book: IBook) {
    this.ID = book.ID;
    this.title = book.title;
    this.author = book.author;
    this.genre = book.genre;
    this.publishedDate = book.publishedDate;
    this.desc = book.desc;
    this.previewLink = book.previewLink;
    this.coverImage = book.coverImage;
    this.shelfNumber = book.shelfNumber;
  }
}
