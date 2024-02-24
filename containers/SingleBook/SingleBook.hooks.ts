import { SearchDialog } from "@/components/SearchDialog/SearchDialog";
import { Role } from "@/constants/Role";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { Book } from "@/entity/Book/Book";
import { mockBook, mockBooks } from "@/entity/Book/Book.mock";
import { useRouter } from "next/router";
interface SingleBookHookProps {}

interface SingleBookHook {
  book: Book | undefined;
  userType: Role;
}

// todo whenever users gets to this page, increment the views
export const useSingleBook = ({}: SingleBookHookProps): SingleBookHook => {
  const router = useRouter();
  const bookID = router.query.id as string;
  const { user } = useUserContext();
  const { setDialogBox } = usePageContext();
  // get book
  const book = mockBooks.find((item) => bookID === item.ID && item);
  const userType = user.role;

  return {
    book,
    userType,
  };
};
