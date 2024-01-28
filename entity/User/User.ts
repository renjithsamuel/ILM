import { Role } from "@/constants/Role";

export interface IUser {
  userID: string;
  name: string;
  email: string;
  role: Role;
  dateOfBirth: Date;
  phoneNumber: number;
  address: string;
  country: string;
  password?: string;
}

export class User implements IUser {
  readonly userID: string;
  name: string;
  email: string;
  role: Role;
  dateOfBirth: Date;
  phoneNumber: number;
  address: string;
  country: string;
  password?: string;

  constructor(user: IUser) {
    this.userID = user.userID;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.dateOfBirth = user.dateOfBirth;
    this.phoneNumber = user.phoneNumber;
    this.address = user.address;
    this.country = user.country;
    this.password = user.password;
  }
}
