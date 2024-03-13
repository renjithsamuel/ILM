import { useGetUserByIDAPI } from "@/api/User/getUserByUserID";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { User } from "@/entity/User/User";
import { mockUser, mockUsers } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import {
  mockbookDetails,
  mockbookDetailsArray,
} from "@/entity/UserBookDetails/UserBookDetails.mock";
import { useRouter } from "next/router";
import { it } from "node:test";
import { useEffect } from "react";

interface singleUserHookProps {}

interface singleUserHook {
  user: User | undefined;
  userBookDetail: BookDetails | undefined;
}

export const useSingleUser = ({}: singleUserHookProps): singleUserHook => {
  const { setSnackBarError } = usePageContext();
  const router = useRouter();
  const userID = router.query.userID as string;
  const { data: userData, isError: isUserError } = useGetUserByIDAPI(userID);

  useEffect(() => {
    if (isUserError) {
      setSnackBarError({
        ErrorMessage: "get user failed",
        ErrorSeverity: "error",
      });
    }
  }, [isUserError]);
  // fetch user with userID
  // const mockSingleUser =
  //   mockUsers.find((item) => item.userID === userID && item) || mockUser;
  // const mockBookDetails =
  //   mockbookDetailsArray.find((item) => item.userID === userID && item) ||
  //   mockbookDetails;

  return {
    user: userData?.data,
    userBookDetail: userData?.data?.bookDetails,
  };
};
