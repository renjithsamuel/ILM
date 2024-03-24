import { useUpdateBookAPI } from "@/goconnection/Book/updateBook";
import { useUpdateBookDetailsAPI } from "@/goconnection/BookDetails/updateBookDetails";
import { useCreateReviewAPI } from "@/goconnection/Review/createReview";
import { usePageContext } from "@/context/PageContext";
import { Book } from "@/entity/Book/Book";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { User } from "@/entity/User/User";
import { createCommentValidation } from "@/validations/commentValidation";
import { useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnySchema } from "yup";

interface addCommentHookProps {
  book: Book;
  user: User;
  checkout: CheckoutTicket;
  handleAddComment: () => void;
}

interface addCommentHook {
  initialValues: any;
  validationSchema: AnySchema;
  fullScreen: boolean;
  openDialog: boolean;
  ratingValue: number | null;
  handleRatingValue: (newValue: number | null) => void;
  handleCloseDialog: () => void;
  handleCreateReview: (values: any) => Promise<void>;
}

export const useAddComment = ({
  handleAddComment,
  book,
  user,
  checkout,
}: addCommentHookProps): addCommentHook => {
  const { setSnackBarError } = usePageContext();
  // for search dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [ratingValue, setRatingValue] = useState<number | null>(null);

  const {
    mutateAsync: createReview,
    isError: isCreateReviewError,
    isSuccess: isCreateReviewSuccess,
  } = useCreateReviewAPI();

  // update book
  const {
    mutateAsync: updateBook,
    isError: isUpdateBookError,
    isSuccess: isUpdateBookSuccess,
  } = useUpdateBookAPI();

  // book details
  const {
    mutateAsync: updateBookDetails,
    isError: isUpdateBookDetailsError,
    isSuccess: isUpdateBookDetailsSuccess,
  } = useUpdateBookDetailsAPI();

  // increase no of rating count in book and completed books list add this for this user
  // create review
  useEffect(() => {
    if (isCreateReviewError) {
      setSnackBarError({
        ErrorMessage: "Create Review Failed!",
        ErrorSeverity: "error",
      });
    }
  }, [isCreateReviewError]);

  useEffect(() => {
    if (isCreateReviewSuccess) {
      setSnackBarError({
        ErrorMessage: "Create Review Success!",
        ErrorSeverity: "success",
      });
    }
  }, [isCreateReviewSuccess]);

  // update book details
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

  const handleCreateReview = async (values: any) => {
    if (!values) return;
    createReview({
      review: {
        ...values,
        rating: ratingValue,
        bookID: book.ID,
        checkoutID: checkout.ID,
        userID: user.userID,
      },
    });
    // update review count and add userid to reviewList
    updateBook({
      book: {
        ...book,
        reviewCount: book.reviewCount + 1,
        reviewsList: [...(book?.reviewsList || []), user.userID],
      },
    });
    // update user book details with completed book
    if (!!user.bookDetails) {
      updateBookDetails({
        bookDetails: {
          ...user.bookDetails,
          completedBooksList: [
            ...(user.bookDetails?.completedBooksList || []),
            book.ISBN,
          ],
          completedBooksCount: user.bookDetails?.completedBooksCount + 1,
        },
      });
    }
    // other cleanup
    handleRatingValue(0);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleAddComment();
  };

  const handleRatingValue = (newValue: number | null) => {
    setRatingValue(newValue);
  };

  // formik related
  const initialValues = {
    commentHeading: "",
    comment: "",
  };

  const validationSchema = createCommentValidation();

  return {
    initialValues,
    validationSchema,
    fullScreen,
    openDialog,
    ratingValue,
    handleRatingValue,
    handleCloseDialog,
    handleCreateReview,
  };
};
