export interface IBook {
  ID: string;
  ISBN: string;
  title: string;
  author: string;
  genre: string;
  publishedDate: Date;
  desc: string;
  previewLink?: string;
  coverImage: string;
  shelfNumber: number;
  inLibrary: boolean;
  booksLeft: number;
  views: number;
  wishlistCount: number;
  reviewCount: number;
  rating: number;
  approximateDemand?: number;
  createdAt: Date;
  updatedAt: Date;
  wishList: string[];
  reviewsList: string[];
  viewsList: string[];
  // ratings need to be added
}

export class Book implements IBook {
  ID: string;
  ISBN: string;
  title: string;
  author: string;
  genre: string;
  publishedDate: Date;
  desc: string;
  previewLink?: string;
  coverImage: string;
  shelfNumber: number;
  inLibrary: boolean;
  booksLeft: number;
  rating: number;
  views: number;
  wishlistCount: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  approximateDemand?: number;
  wishList: string[];
  reviewsList: string[];
  viewsList: string[];

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
    this.reviewCount = book.reviewCount;
    this.rating = book.rating;
    this.approximateDemand = book.approximateDemand;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
    this.reviewsList = book.reviewsList;
    this.wishList = book.wishList;
    this.viewsList = book.viewsList;
  }
}
