import { useGetBookAPI } from "@/api/Book/getBook";
import { useUpdateBookDetailsAPI } from "@/api/BookDetails/updateBookDetails";
import { useCreateCheckoutAPI } from "@/api/Checkout/createCheckout";
import { useGetCheckoutByUserIDAPI } from "@/api/Checkout/getCheckoutByUserID";
import { useGetAllReviewsByBookIDAPI } from "@/api/Review/getReviews";
import { ModifyCount } from "@/components/ModifyCount/ModifyCount";
import { SearchDialog } from "@/components/SearchDialog/SearchDialog";
import { QueryKeys } from "@/constants/Querykeys";
import { Role } from "@/constants/Role";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { Book } from "@/entity/Book/Book";
import { mockBook, mockBooks } from "@/entity/Book/Book.mock";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { Review } from "@/entity/Review/Review";
import { mockReviews } from "@/entity/Review/Review.mock";
import { User } from "@/entity/User/User";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
interface SingleBookHookProps {}

interface SingleBookHook {
  commentList: Review[] | undefined;
  book: Book | undefined;
  checkoutData: CheckoutTicket | undefined;
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
  handleAddToWishList: () => void;
}

// todo whenever users gets to this page, increment the views
export const useSingleBook = ({}: SingleBookHookProps): SingleBookHook => {
  const router = useRouter();
  const { setSnackBarError } = usePageContext();
  const bookID = router.query.id as string;
  // const [commentList, setCommentList] = useState<Review[]>([]);
  const [isModifyCountOpen, setIsModifyCountOpen] = useState<boolean>();
  const [isAddCommentOpen, setIsAddCommentOpen] = useState<boolean>();
  const { user } = useUserContext();

  // get book
  const { data: bookData, isError: isBookError } = useGetBookAPI(
    bookID,
    !!bookID
  );
  // get checkout
  const { data: checkoutData, isError: isGetCheckoutError } =
    useGetCheckoutByUserIDAPI(
      bookData?.data.ID,
      user.userID,
      !!bookData?.data.ID && !!user.userID
    );
  // get all reviews
  const { data: reviewsData, isError: isGetReviewError } =
    useGetAllReviewsByBookIDAPI(bookData?.data.ID, !!bookData?.data.ID);

  // invalidate reviews
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   queryClient.refetchQueries(QueryKeys.GET_REVIEW);
  //   queryClient.refetchQueries(QueryKeys.GET_REVIEWS);
  //   queryClient.invalidateQueries(QueryKeys.GET_REVIEW);
  //   queryClient.invalidateQueries(QueryKeys.GET_REVIEWS);
  // });

  const {
    mutateAsync: createCheckout,
    isError: isCheckoutError,
    isSuccess: isCheckoutSuccess,
  } = useCreateCheckoutAPI();

  const {
    mutateAsync: updateBookDetails,
    isError: isUpdateBookDetailsError,
    isSuccess: isUpdateBookDetailsSuccess,
  } = useUpdateBookDetailsAPI();

  // book
  useEffect(() => {
    if (isBookError) {
      setSnackBarError({
        ErrorMessage: "get book failed",
        ErrorSeverity: "error",
      });
    }
  }, [isBookError]);

  // checkout
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

  // book details
  useEffect(() => {
    if (isUpdateBookDetailsError) {
      setSnackBarError({
        ErrorMessage: "update failed",
        ErrorSeverity: "error",
      });
    }
  }, [isUpdateBookDetailsError]);

  useEffect(() => {
    if (isUpdateBookDetailsSuccess) {
      setSnackBarError({
        ErrorMessage: "updated details",
        ErrorSeverity: "success",
      });
    }
  }, [isUpdateBookDetailsSuccess]);

  // get checkout
  useEffect(() => {
    if (isGetCheckoutError) {
      setSnackBarError({
        ErrorMessage: "No checkout found",
        ErrorSeverity: "info",
      });
    }
  }, [isGetCheckoutError]);

  // get checkout
  useEffect(() => {
    if (isGetReviewError) {
      setSnackBarError({
        ErrorMessage: "Reviews Not Found!",
        ErrorSeverity: "warning",
      });
    }
  }, [isGetReviewError]);

  // useEffect(() => {
  //   setCommentList(mockReviews);
  // }, []);

  const userType = user.role;

  const wishlisted: boolean =
    !!user.bookDetails?.wishlistBooks.find(
      (item) => item === bookData?.data.ISBN
    ) ?? true;

  const handleModifyCount = () => {
    setIsModifyCountOpen(!isModifyCountOpen);
  };

  const handleAddComment = () => {
    console.log("checkoutData?.data", checkoutData?.data);
    if (!checkoutData?.data) {
      setSnackBarError({
        ErrorMessage: "Adding comment is only after reading the book",
        ErrorSeverity: "info",
      });
      return;
    }
    setIsAddCommentOpen(!isAddCommentOpen);
  };
  // todo
  const handleAddToLibrary = () => {};

  // todo update reserved books for this user
  // reserve books
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

  const handleAddToWishList = () => {
    // need to update book with wishlist count
    if (wishlisted && user.bookDetails && bookData?.data.ISBN) {
      const removedArray = user.bookDetails.wishlistBooks.filter(
        (item) => item !== bookData?.data.ISBN
      );
      // remove book isbn
      user.bookDetails &&
        bookData?.data.ISBN &&
        updateBookDetails({
          bookDetails: {
            ...user.bookDetails,
            wishlistBooks: removedArray,
          },
        });
    } else {
      user.bookDetails &&
        bookData?.data.ISBN &&
        updateBookDetails({
          bookDetails: {
            ...user.bookDetails,
            wishlistBooks: [
              ...user.bookDetails.wishlistBooks,
              bookData?.data.ISBN,
            ],
          },
        });
    }
  };

  return {
    checkoutData: checkoutData?.data,
    commentList: reviewsData?.data,
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
    handleAddToWishList,
  };
};
