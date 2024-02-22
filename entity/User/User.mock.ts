import { Role } from "@/constants/Role";
import { User } from "./User";
import { BookGenre } from "@/constants/BookGenre";
import { mockBook } from "../Book/Book.mock";

export const mockUser: User = {
  userID: "123456",
  name: "John Doe",
  email: "john.doe@example.com",
  role: Role.Librarian,
  dateOfBirth: new Date("1990-01-01"),
  joinedDate: new Date("1990-01-01"),
  phoneNumber: 1234567890,
  address: "123 Main Street",
  country: "United States",
  password: "securePassword123",
};

export const mockUsers: User[] = [
  mockUser,
  { ...mockUser, name: "John Doe 2", userID: "123457" },
  { ...mockUser, name: "John Doe 3", userID: "123458" },
];
