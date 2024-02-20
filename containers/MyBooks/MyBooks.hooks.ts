import { useUserContext } from "@/context/UserContext";
import { User } from "@/entity/User/User";
import { mockUser } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetails } from "@/entity/UserBookDetails/UserBookDetails.mock";
import { useRouter } from "next/router";

interface myBooksHookProps {}

interface myBooksHook {
  user: User;
  userBookDetail: BookDetails;
}

export const useMyBooks = ({}: myBooksHookProps): myBooksHook => {
  const { user } = useUserContext();

  const userID = user.userID;
  // fetch user with userID
  const mockMyBooks = mockUser;
  const mockBookDetails = mockbookDetails;

  return {
    user: mockMyBooks,
    userBookDetail: mockBookDetails,
  };
};
