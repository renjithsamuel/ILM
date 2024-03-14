import { useCreateReviewAPI } from "@/api/Review/createReview";
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
  handleCreateReview: (values: any) => void;
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

  const handleCreateReview = (values: any) => {
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
    handleRatingValue(0);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleAddComment();
  };

  const handleRatingValue = (newValue: number | null) => {
    console.log(newValue);
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
