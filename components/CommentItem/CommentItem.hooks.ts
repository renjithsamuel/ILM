import { Review } from "@/entity/Review/Review";
import { User } from "@/entity/User/User";
import { mockUser } from "@/entity/User/User.mock";

interface commentItemHookProps {  review: Review;}

interface commentItemHook {
  user: User;
}

export const useCommentItem =
  ({review}: commentItemHookProps): commentItemHook => {
    const user = mockUser

    return {
      user
    };
  };
