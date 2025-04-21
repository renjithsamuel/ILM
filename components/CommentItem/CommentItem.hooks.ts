import { useGetUserByIDAPI } from "@/goconnection/User/getUserByUserID";
import { usePageContext } from "@/context/PageContext";
import { Review } from "@/entity/Review/Review";
import { User } from "@/entity/User/User";
import { mockUser } from "@/entity/User/User.mock";
import { useEffect } from "react";

interface commentItemHookProps {
  review: Review;
}

interface commentItemHook {
  user: User | undefined;
}

export const useCommentItem = ({
  review,
}: commentItemHookProps): commentItemHook => {
  const { setSnackBarError } = usePageContext();
  const { data: getUserResponse, isError: isGetUserError } = useGetUserByIDAPI(
    review.userID,
    !!review.userID,
  );

  useEffect(() => {
    if (isGetUserError) {
      setSnackBarError({
        ErrorMessage: "get user failed",
        ErrorSeverity: "error",
      });
    }
  }, [isGetUserError]);

  return {
    user: getUserResponse?.data,
  };
};
