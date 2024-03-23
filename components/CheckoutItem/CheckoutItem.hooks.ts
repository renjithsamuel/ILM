import { useUpdateBookAPI } from "@/api/Book/updateBook";
import { useUpdateBookDetailsAPI } from "@/api/BookDetails/updateBookDetails";
import { useDeleteCheckoutAPI } from "@/api/Checkout/deleteCheckout";
import { useUpdateCheckoutAPI } from "@/api/Checkout/updateCheckout";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface checkoutItemHookProps {
  checkoutItem: CheckoutTicket;
}

interface checkoutItemHook {
  isExtendOpen: boolean;
  isModifyFineAmountOpen: boolean;
  handleCheckout: () => Promise<void>;
  handleReturn: () => Promise<void>;
  handleExtendOpen: () => void;
  handleExtend: (value: number) => void;
  handleModifyFineAmount: () => void;
  handleDeleteCheckout: () => Promise<void>;
}

export const useCheckoutItem = ({
  checkoutItem,
}: checkoutItemHookProps): checkoutItemHook => {
  const { user } = useUserContext();
  const { setSnackBarError } = usePageContext();
  const [isExtendOpen, setIsExtendOpen] = useState<boolean>(false);
  const [isModifyFineAmountOpen, setIsModifyFineAmountOpen] =
    useState<boolean>(false);
  const {
    mutateAsync: updateCheckoutTicket,
    isError: isUpdateCheckoutError,
    isSuccess: isUpdateCheckoutSuccess,
  } = useUpdateCheckoutAPI();

  // update book
  const {
    mutateAsync: updateBook,
    isError: isUpdateBookError,
    isSuccess: isUpdateBookSuccess,
  } = useUpdateBookAPI();

  // update book details
  const {
    mutateAsync: updateBookDetails,
    isError: isUpdateBookDetailsError,
    isSuccess: isUpdateBookDetailsSuccess,
  } = useUpdateBookDetailsAPI();

  const {
    mutateAsync: deleteCheckoutTicket,
    isError: isDeleteCheckoutError,
    isSuccess: isDeleteCheckoutSuccess,
  } = useDeleteCheckoutAPI();

  const handleCheckout = async () => {
    let res = await updateCheckoutTicket({
      checkOutTicket: {
        ...checkoutItem,
        checkedOutOn: new Date(),
        isCheckedOut: true,
      },
    });
    if (res.status >= 300) return;
    // update checked out books for this user
    if (checkoutItem?.book && user?.bookDetails) {
      res = await updateBookDetails({
        bookDetails: {
          ...user.bookDetails,
          checkedOutBookList: [
            ...(user?.bookDetails.checkedOutBookList || []),
            checkoutItem?.book.ISBN,
          ],
          checkedOutBooksCount: user.bookDetails.checkedOutBooksCount + 1,
        },
      });
      if (res.status >= 300) return;
      // update book details to reduce the stock
      updateBook({
        book: {
          ...checkoutItem?.book,
          booksLeft: checkoutItem.book?.booksLeft - 1,
        },
      });
    }

    // approximate demand points + 1 // reset approximate demand points every month
  };

  // todo update returned books for this user
  const handleReturn = async () => {
    const res = await updateCheckoutTicket({
      checkOutTicket: {
        ...checkoutItem,
        returnedDate: new Date(),
        isReturned: true,
      },
    });
    if (res.status >= 300) return;
    if (checkoutItem.book)
      // update book details to increase the stock
      updateBook({
        book: {
          ...checkoutItem?.book,
          booksLeft: checkoutItem.book?.booksLeft + 1,
        },
      });
  };

  const handleExtend = (value: number) => {
    updateCheckoutTicket({
      checkOutTicket: {
        ...checkoutItem,
        numberOfDays: value,
      },
    });
  };

  const handleModifyFineAmount = () => {
    setIsModifyFineAmountOpen(!isModifyFineAmountOpen);
  };

  const handleExtendOpen = () => {
    setIsExtendOpen(!isExtendOpen);
  };

  const handleDeleteCheckout = async () => {
    if (!!user.bookDetails && !!checkoutItem.book) {
      const res = await deleteCheckoutTicket({ checkoutID: checkoutItem.ID });
      if (res.status >= 300) return;
      // update reserved book for this user
      const removedArray = (user.bookDetails?.reservedBookList || []).filter(
        (item) => !!checkoutItem?.book && item !== checkoutItem?.book.ISBN
      );

      checkoutItem.book &&
        updateBookDetails({
          bookDetails: {
            ...user.bookDetails,
            reservedBookList: removedArray,
            reservedBooksCount: user.bookDetails.reservedBooksCount - 1,
          },
        });
    }
  };

  // update checkout
  useEffect(() => {
    if (isUpdateCheckoutSuccess) {
      setSnackBarError({
        ErrorMessage: "updated successfully!",
        ErrorSeverity: "success",
      });
    }
  }, [isUpdateCheckoutSuccess]);

  useEffect(() => {
    if (isUpdateCheckoutError) {
      setSnackBarError({
        ErrorMessage: "update failed!",
        ErrorSeverity: "error",
      });
    }
  }, [isUpdateCheckoutError]);

  // delete
  useEffect(() => {
    if (isDeleteCheckoutSuccess) {
      setSnackBarError({
        ErrorMessage: "delete successfully!",
        ErrorSeverity: "success",
      });
    }
  }, [isDeleteCheckoutSuccess]);

  useEffect(() => {
    if (isDeleteCheckoutError) {
      setSnackBarError({
        ErrorMessage: "delete failed!",
        ErrorSeverity: "error",
      });
    }
  }, [isDeleteCheckoutError]);

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

  // book
  useEffect(() => {
    if (isUpdateBookError) {
      setSnackBarError({
        ErrorMessage: "update book failed",
        ErrorSeverity: "error",
      });
    }
  }, [isUpdateBookError]);

  useEffect(() => {
    if (isUpdateBookSuccess) {
      setSnackBarError({
        ErrorMessage: "updated book details",
        ErrorSeverity: "success",
      });
    }
  }, [isUpdateBookSuccess]);

  return {
    isExtendOpen,
    isModifyFineAmountOpen,
    handleModifyFineAmount,
    handleCheckout,
    handleReturn,
    handleExtendOpen,
    handleExtend,
    handleDeleteCheckout,
  };
};
