import { useUserContext } from "@/context/UserContext";
import { User } from "@/entity/User/User";
import { mockUser } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetails } from "@/entity/UserBookDetails/UserBookDetails.mock";
import { useRouter } from "next/router";

interface myBooksHookProps {}

interface myBooksHook {
  user: User;
  userBookDetail: BookDetails | undefined;
}

export const useMyBooks = ({}: myBooksHookProps): myBooksHook => {
  const { user } = useUserContext();

  return {
    user: user,
    userBookDetail: user.bookDetails,
  };
};
