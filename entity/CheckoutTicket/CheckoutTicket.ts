import { Book } from "../Book/Book";
import { User } from "../User/User";

export interface ICheckoutTicket {
  ID : string;
  bookID: string;
  userID: string;
  isCheckedOut: boolean;
  isReturned: boolean;
  numberOfDays: number;
  fineAmount: number;
  reservatedOn: Date;
  checkedOutOn?: Date;
  returnedDate?: Date;
  book?: Book;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}

export class CheckoutTicket implements ICheckoutTicket {
  ID : string;
  bookID: string;
  userID: string;
  isCheckedOut: boolean;
  isReturned: boolean;
  numberOfDays: number;
  fineAmount: number;
  reservatedOn: Date;
  checkedOutOn?: Date;
  returnedDate?: Date;
  book?: Book;
  user?: User;
  createdAt: Date;
  updatedAt: Date;

  constructor(checkoutTicket: ICheckoutTicket) {
    this.ID = checkoutTicket.ID;
    this.bookID = checkoutTicket.bookID;
    this.userID = checkoutTicket.userID;
    this.isCheckedOut = checkoutTicket.isCheckedOut;
    this.isReturned = checkoutTicket.isReturned;
    this.numberOfDays = checkoutTicket.numberOfDays;
    this.fineAmount = checkoutTicket.fineAmount;
    this.reservatedOn = checkoutTicket.reservatedOn;
    this.checkedOutOn = checkoutTicket.checkedOutOn;
    this.returnedDate = checkoutTicket.returnedDate;
    this.book = checkoutTicket.book;
    this.user = checkoutTicket.user;
    this.createdAt = checkoutTicket.createdAt;
    this.updatedAt = checkoutTicket.updatedAt;
  }
}
