import { Role } from "@/constants/Role";
import { IBook } from "../Book/Book";
import { BookGenre } from "@/constants/BookGenre";

export interface IUser {
  userID: string;
  name: string;
  email: string;
  role: Role;
  dateOfBirth: Date;
  phoneNumber: number;
  address: string;
  joinedDate: Date;
  country: string;
  views: number;
  fineAmount: number;
  password?: string;
  isPaymentDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IUser {
  readonly userID: string;
  name: string;
  email: string;
  role: Role;
  dateOfBirth: Date;
  phoneNumber: number;
  address: string;
  joinedDate: Date;
  country: string;
  views: number;
  password?: string;
  fineAmount: number;
  isPaymentDone: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: IUser) {
    this.userID = user.userID;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.dateOfBirth = user.dateOfBirth;
    this.phoneNumber = user.phoneNumber;
    this.address = user.address;
    this.joinedDate = user.joinedDate;
    this.country = user.country;
    this.views = user.views;
    this.isPaymentDone = user.isPaymentDone;
    this.fineAmount = user.fineAmount;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

// can revoke membership