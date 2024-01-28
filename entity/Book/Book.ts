export interface IBook {
  title: string;
  author: string;
  subject: string;
  publishedDate: string;
  desc: string;
  previewLink?: string;
  coverImage: string;
}

export class Book implements IBook {
  title: string;
  author: string;
  subject: string;
  publishedDate: string;
  desc: string;
  previewLink?: string;
  coverImage: string;

  constructor(book: IBook) {
    this.title = book.title;
    this.author = book.author;
    this.subject = book.subject;
    this.publishedDate = book.publishedDate;
    this.desc = book.desc;
    this.previewLink = book.previewLink;
    this.coverImage = book.coverImage;
  }
}
