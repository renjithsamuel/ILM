import { User } from "@/entity/User/User";
import { mockUser } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetails } from "@/entity/UserBookDetails/UserBookDetails.mock";
import { useRouter } from "next/router";

interface singleUserHookProps {}

interface singleUserHook {
  user: User;
  userBookDetail: BookDetails;
}

export const useSingleUser = ({}: singleUserHookProps): singleUserHook => {
  const router = useRouter();
  const userID = router.query.userID as string;
  // fetch user with userID
  const mockSingleUser = mockUser;
  const mockBookDetails = mockbookDetails;

  return {
    user: mockSingleUser,
    userBookDetail: mockBookDetails,
  };
};
