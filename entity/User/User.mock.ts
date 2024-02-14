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
  phoneNumber: 1234567890,
  address: "123 Main Street",
  country: "United States",
  password: "securePassword123",
  bookDetails: {
    hasPendingBooks: true,
    pendingBooksCount: 2,
    pendingBooksList: [mockBook],
    checkedOutBooksCount: 2,
    checkedOutBookList: [mockBook],
    reservedBooksCount: 2,
    reservedBookList: [mockBook],
    wishlistBooks: [mockBook],
    favoriteGenres: [BookGenre.Adventure, BookGenre.ScienceFiction],
  },
};

export const mockUsers: User[] = [mockUser, mockUser, mockUser];
