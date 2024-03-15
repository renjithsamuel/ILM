import { useGetBookAPI } from "@/api/Book/getBook";
import { useUpdateBookAPI } from "@/api/Book/updateBook";
import { useUpdateBookDetailsAPI } from "@/api/BookDetails/updateBookDetails";
import { useCreateCheckoutAPI } from "@/api/Checkout/createCheckout";
import { useGetCheckoutByUserIDAPI } from "@/api/Checkout/getCheckoutByUserID";
import { useGetAllReviewsByBookIDAPI } from "@/api/Review/getReviews";
import { Role } from "@/constants/Role";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { Book } from "@/entity/Book/Book";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { Review } from "@/entity/Review/Review";
import { User } from "@/entity/User/User";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
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
  isBookCompleted: boolean;
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

  // update book
  const {
    mutateAsync: updateBook,
    isError: isUpdateBookError,
    isSuccess: isUpdateBookSuccess,
  } = useUpdateBookAPI();

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

  // todo handleAddToLibrary
  const handleAddToLibrary = () => {
    if (bookData?.data && !bookData?.data.inLibrary) {
      bookData?.data &&
        // update this with create book req
        updateBook({
          book: {
            ...bookData?.data,
            inLibrary: true,
          },
        });
    }
  };

  // todo update reserved books for this user
  // reserve books
  const handleCheckoutFlow = async (bookID: string) => {
    if (bookID && user.userID) {
      const numberOfDays = 15;
      const res = await createCheckout({
        bookID: bookID,
        userID: user.userID,
        numberOfDays: numberOfDays,
      });
      if (res.status >= 300) return;
      // update reserved book for this user
      user.bookDetails &&
        bookData?.data &&
        updateBookDetails({
          bookDetails: {
            ...user.bookDetails,
            reservedBookList: [
              ...(user.bookDetails.reservedBookList || []),
              bookData.data.ISBN,
            ],
            reservedBooksCount: user.bookDetails.reservedBooksCount + 1,
          },
        });
    }
  };

  const handleAddToWishList = async () => {
    // need to update book with wishlist count
    if (wishlisted && user.bookDetails && bookData?.data.ISBN) {
      let removedArray = (user.bookDetails.wishlistBooks || []).filter(
        (item) => item !== bookData?.data.ISBN
      );
      // remove book isbn in book details
      if (user.bookDetails && bookData?.data.ISBN) {
        const res = await updateBookDetails({
          bookDetails: {
            ...user.bookDetails,
            wishlistBooks: removedArray,
          },
        });

        if (res.status >= 300) return;
        // remove userid from wishlist arr of book
        removedArray = (bookData?.data?.wishList || []).filter(
          (item) => item !== user.userID
        );
        updateBook({
          book: {
            ...bookData?.data,
            wishlistCount: bookData?.data.wishlistCount - 1,
            wishList: removedArray,
          },
        });
      }
    } else {
      // add book isbn  in book details
      if (user.bookDetails && bookData?.data.ISBN) {
        const res = await updateBookDetails({
          bookDetails: {
            ...user.bookDetails,
            wishlistBooks: [
              ...(user.bookDetails.wishlistBooks || []),
              bookData?.data.ISBN,
            ],
          },
        });
        if (res.status >= 300) return;
        // add userid in book wishlist arr
        bookData?.data &&
          updateBook({
            book: {
              ...bookData?.data,
              wishlistCount: bookData?.data.wishlistCount + 1,
              wishList: [...(bookData?.data?.wishList || []), user.userID],
            },
          });
      }
    }
  };

  // views updation
  useEffect(() => {
    if (!!bookData?.data) {
      console.log("!!bookData?.data", !!bookData?.data);
      const isUserNotViewed = !(bookData?.data.viewsList || []).includes(
        user.userID
      );
      console.log("isUserNotViewed", isUserNotViewed);
      // if user haven't viewed yet add him to the viewList
      if (isUserNotViewed) {
        updateBook({
          book: {
            ...bookData?.data,
            views: (bookData?.data.views || 0) + 1, // Ensure views is initialized to 0 if it's undefined
            viewsList: [...(bookData?.data?.viewsList || []), user.userID],
          },
        });
      }
    }
  }, []);

  // isBookCompleted?
  const isBookCompleted: boolean =
    !!bookData?.data &&
    !!user.bookDetails?.completedBooksList.includes(bookData?.data.ISBN);

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

  return {
    checkoutData: checkoutData?.data,
    commentList: reviewsData?.data,
    user,
    book: bookData?.data,
    userType,
    wishlisted,
    isModifyCountOpen,
    isAddCommentOpen,
    isBookCompleted,
    handleAddComment,
    setIsModifyCountOpen,
    handleModifyCount,
    handleAddToLibrary,
    handleCheckoutFlow,
    handleAddToWishList,
  };
};
