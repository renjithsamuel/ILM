import { Book } from "@/entity/Book/Book";

export interface BookKeyValues {
  name: string;
  key: string;
  get: (book: Book) => string;
}
