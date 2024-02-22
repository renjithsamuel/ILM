import { User } from "@/entity/User/User";
import { mockUser, mockUsers } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import {
  mockbookDetails,
  mockbookDetailsArray,
} from "@/entity/UserBookDetails/UserBookDetails.mock";
import { useRouter } from "next/router";
import { it } from "node:test";

interface singleUserHookProps {}

interface singleUserHook {
  user: User;
  userBookDetail: BookDetails;
}

export const useSingleUser = ({}: singleUserHookProps): singleUserHook => {
  const router = useRouter();
  const userID = router.query.userID as string;
  // fetch user with userID
  const mockSingleUser =
    mockUsers.find((item) => item.userID === userID && item) || mockUser;
  const mockBookDetails =
    mockbookDetailsArray.find((item) => item.userID === userID && item) ||
    mockbookDetails;

  return {
    user: mockSingleUser,
    userBookDetail: mockBookDetails,
  };
};
