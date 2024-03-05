import { ModifyCount } from "@/components/ModifyCount/ModifyCount";
import { SearchDialog } from "@/components/SearchDialog/SearchDialog";
import { Role } from "@/constants/Role";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { Book } from "@/entity/Book/Book";
import { mockBook, mockBooks } from "@/entity/Book/Book.mock";
import { User } from "@/entity/User/User";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface SingleBookHookProps {}

interface SingleBookHook {
  book: Book | undefined;
  userType: Role;
  user: User;
  wishlisted: boolean;
  isModifyCountOpen: boolean | undefined;
  handleModifyCount: () => void;
  handleAddToLibrary: () => void;
  setIsModifyCountOpen: Dispatch<SetStateAction<boolean | undefined>>;
}

// todo whenever users gets to this page, increment the views
export const useSingleBook = ({}: SingleBookHookProps): SingleBookHook => {
  const router = useRouter();
  const bookID = router.query.id as string;
  const [book, setBook] = useState<Book | undefined>();
  const [isModifyCountOpen, setIsModifyCountOpen] = useState<boolean>();
  const { user } = useUserContext();

  const { setDialogBox, DialogBox } = usePageContext();
  // get book
  useEffect(() => {
    const tempBook = mockBooks.find((item) => bookID === item.ID && item);
    if (tempBook) setBook(tempBook);
  }, [bookID]);

  const userType = user.role;
  const wishlisted = true;

  const handleModifyCount = () => {
    setIsModifyCountOpen(!isModifyCountOpen);
  };
  const handleAddToLibrary = () => {};

  return {
    user,
    book,
    userType,
    wishlisted,
    isModifyCountOpen,
    setIsModifyCountOpen,
    handleModifyCount,
    handleAddToLibrary,
  };
};
