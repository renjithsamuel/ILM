import { EntityTypes } from "@/constants/GlobalConstants";
import { SearchItem } from "./SearchItem";

export const mockSearchItemBook: SearchItem = {
  entityID: "3e74718b-3855-43ba-ae2c-4be8ccc79027",
  entityType: EntityTypes.BookEntity,
  views: 2,
  bookname: "The Great Gatsby",
  bookDescription: "A novel about the American Dream",
};

export const mockSearchItemUser: SearchItem = {
  entityID: "123456",
  entityType: EntityTypes.UserEntity,
  views: 2,
  username: "John Doe",
  emailID: "john.doe@example.com",
};

export const mockSearchItems: SearchItem[] = [
  mockSearchItemBook,
  { ...mockSearchItemUser },
  { ...mockSearchItemBook },
  { ...mockSearchItemBook },
  { ...mockSearchItemBook },
];
