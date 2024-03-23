import { useGetBookAPI } from "@/goconnection/Book/getBook";
import { useUpdateBookAPI } from "@/goconnection/Book/updateBook";
import { useUpdateBookDetailsAPI } from "@/goconnection/BookDetails/updateBookDetails";
import { useCreateCheckoutAPI } from "@/goconnection/Checkout/createCheckout";
import { useGetCheckoutByUserIDAPI } from "@/goconnection/Checkout/getCheckoutByUserID";
import { useGetAllReviewsByBookIDAPI } from "@/goconnection/Review/getReviews";
import { ReviewSortValue, SortOrder } from "@/constants/GlobalConstants";
import { Role } from "@/constants/Role";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { Book } from "@/entity/Book/Book";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { Review } from "@/entity/Review/Review";
import { User } from "@/entity/User/User";
import { SelectChangeEvent } from "@mui/material";
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
  // pagination and sorting
  sortByValue: ReviewSortValue;
  totalPages: number;
  pageNumber: number;
  rowsPerPage: number;
  handleRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePageNumber: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
}

// todo whenever users gets to this page, increment the views
export const useSingleBook = ({}: SingleBookHookProps): SingleBookHook => {
  const router = useRouter();
  const { setSnackBarError } = usePageContext();
  const bookID = router.query.id as string;
  // const [commentList, setCommentList] = useState<Review[]>([]);
  const [isModifyCountOpen, setIsModifyCountOpen] = useState<boolean>();
  const [isAddCommentOpen, setIsAddCommentOpen] = useState<boolean>();
  const [isBookCompleted, setIsBookCompleted] = useState<boolean>(false);

  // pagination related
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [sortByValue, setSortByValue] = useState<ReviewSortValue>(
    ReviewSortValue.newest
  );

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
  const { data: checkoutsData, isError: isGetCheckoutError } =
    useGetCheckoutByUserIDAPI(
      bookData?.data.ID,
      user.userID,
      !!bookData?.data.ID && !!user.userID
    );
  // get all reviews
  const { data: reviewsData, isError: isGetReviewError } =
    useGetAllReviewsByBookIDAPI(
      {
        bookID: bookData?.data.ID,
        sortBy: sortByValue,
        limit: rowsPerPage,
        page: pageNumber,
      },
      !!bookData?.data.ID
    );

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
    console.log("checkoutData?.data", checkoutsData?.data);
    if (
      !checkoutsData?.data ||
      (!!checkoutsData?.data && checkoutsData?.data?.length) < 0
    ) {
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

  // reserve books
  const handleCheckoutFlow = async (bookID: string) => {
    try {
      if (bookID && user.userID) {
        const numberOfDays = 15;
        const res = await createCheckout({
          bookID: bookID,
          userID: user.userID,
          numberOfDays: numberOfDays,
        });

        // Update reserved book for this user
        if (res.status === 409) {
          throw new Error("This Book is pending in a different checkout!");
        } else if (res.status >= 300) {
          throw new Error("Error while checking out!");
        }

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
    } catch (err) {
      setSnackBarError({
        ErrorMessage: err as string,
        ErrorSeverity: "warning",
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
  useEffect(() => {
    if (!!bookData?.data) {
      const tempIsBookCompleted: boolean =
        !!user.bookDetails?.completedBooksList.includes(bookData?.data.ISBN);
      console.log("tempIsBookCompleted", tempIsBookCompleted);
      if (tempIsBookCompleted != undefined) {
        setIsBookCompleted(tempIsBookCompleted);
      }
    }
  }, [user.bookDetails?.completedBooksList, bookData?.data]);

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
        ErrorMessage: "checkout failed",
        ErrorSeverity: "warning",
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

  // checkout data
  const checkoutReturned = checkoutsData?.data.find((item) => item.isReturned);

  // sorting
  const handleSortValue = (event: SelectChangeEvent): void => {
    event.target.value && setSortByValue(event.target.value as ReviewSortValue);
  };

  // pagination
  const handleRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (event.target.value) {
      setRowsPerPage(Number.parseInt(event.target.value, 10));
      setPageNumber(1); // Reset page number when rows per page changes
    }
  };

  const handlePageNumber = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ): void => {
    if (val) {
      setPageNumber(val);
    }
  };

  return {
    checkoutData: checkoutReturned,
    commentList: reviewsData?.data.reviews,
    totalPages: reviewsData?.data.totalPages ?? -1,
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
    // pagination and sorting

    sortByValue,
    pageNumber,
    rowsPerPage,
    handleRowsPerPage,
    handlePageNumber,
    handleSortValue,
  };
};
