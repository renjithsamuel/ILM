import { Role } from "@/constants/Role";
import { User } from "./User";

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
  views: 2,
  fineAmount: 200,
  isPaymentDone: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUsers: User[] = [
  mockUser,
  {
    ...mockUser,
    name: "John Doe 2",
    role: Role.Patrons,
    userID: "123457",
    isPaymentDone: false,
  },
  { ...mockUser, name: "John Doe 3", role: Role.Patrons, userID: "123458" },
];
