import { useGetBookAPI } from "@/api/Book/getBook";
import { useCreateCheckoutAPI } from "@/api/Checkout/createCheckout";
import { ModifyCount } from "@/components/ModifyCount/ModifyCount";
import { SearchDialog } from "@/components/SearchDialog/SearchDialog";
import { Role } from "@/constants/Role";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { Book } from "@/entity/Book/Book";
import { mockBook, mockBooks } from "@/entity/Book/Book.mock";
import { Review } from "@/entity/Review/Review";
import { mockReviews } from "@/entity/Review/Review.mock";
import { User } from "@/entity/User/User";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface SingleBookHookProps {}

interface SingleBookHook {
  commentList: Review[];
  book: Book | undefined;
  userType: Role;
  user: User;
  wishlisted: boolean;
  isModifyCountOpen: boolean | undefined;
  isAddCommentOpen: boolean | undefined;
  handleAddComment: () => void;
  handleModifyCount: () => void;
  handleAddToLibrary: () => void;
  handleCheckoutFlow: (bookID: string) => Promise<void>;
  setIsModifyCountOpen: Dispatch<SetStateAction<boolean | undefined>>;
}

// todo whenever users gets to this page, increment the views
export const useSingleBook = ({}: SingleBookHookProps): SingleBookHook => {
  const router = useRouter();
  const { setSnackBarError } = usePageContext();
  const bookID = router.query.id as string;
  const [commentList, setCommentList] = useState<Review[]>([]);
  const [isModifyCountOpen, setIsModifyCountOpen] = useState<boolean>();
  const [isAddCommentOpen, setIsAddCommentOpen] = useState<boolean>();
  const { user } = useUserContext();

  // get book
  const { data: bookData, isError: isBookError } = useGetBookAPI(bookID);

  const {
    mutateAsync: createCheckout,
    isError: isCheckoutError,
    isSuccess: isCheckoutSuccess,
  } = useCreateCheckoutAPI();

  useEffect(() => {
    if (isBookError) {
      setSnackBarError({
        ErrorMessage: "get book failed",
        ErrorSeverity: "error",
      });
    }
  }, [isBookError]);

  useEffect(() => {
    if (isCheckoutError) {
      setSnackBarError({
        ErrorMessage: "create reservation failed",
        ErrorSeverity: "error",
      });
    }
  }, [isCheckoutError]);

  useEffect(() => {
    if (isCheckoutSuccess) {
      setSnackBarError({
        ErrorMessage: "reserved book",
        ErrorSeverity: "success",
      });
    }
  }, [isCheckoutSuccess]);

  useEffect(() => {
    setCommentList(mockReviews);
  }, []);

  const userType = user.role;
  const wishlisted = true;

  const handleModifyCount = () => {
    setIsModifyCountOpen(!isModifyCountOpen);
  };

  const handleAddComment = () => {
    setIsAddCommentOpen(!isAddCommentOpen);
  };
  const handleAddToLibrary = () => {};

  const handleCheckoutFlow = async (bookID: string) => {
    if (bookID && user.userID) {
      const numberOfDays = 15;
      createCheckout({
        bookID: bookID,
        userID: user.userID,
        numberOfDays: numberOfDays,
      });
    }
  };

  return {
    commentList,
    user,
    book: bookData?.data,
    userType,
    wishlisted,
    isModifyCountOpen,
    isAddCommentOpen,
    handleAddComment,
    setIsModifyCountOpen,
    handleModifyCount,
    handleAddToLibrary,
    handleCheckoutFlow,
  };
};
