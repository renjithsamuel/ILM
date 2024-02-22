import { Role } from "@/constants/Role";
import { useUserContext } from "@/context/UserContext";
import { Book } from "@/entity/Book/Book";
import { mockBook, mockBooks } from "@/entity/Book/Book.mock";
import { useRouter } from "next/router";
interface SingleBookHookProps {}

interface SingleBookHook {
  book: Book | undefined;
  userType: Role;
}

export const useSingleBook = ({}: SingleBookHookProps): SingleBookHook => {
  const router = useRouter();
  const bookID = router.query.id as string;
  const { user } = useUserContext() 
  // get book
  const book = mockBooks.find((item) => bookID === item.ID && item);
  const userType = user.role;

  return {
    book,
    userType,
  };
};
