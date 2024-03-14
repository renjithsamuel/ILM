import { useDeleteCheckoutAPI } from "@/api/Checkout/deleteCheckout";
import { useUpdateCheckoutAPI } from "@/api/Checkout/updateCheckout";
import { usePageContext } from "@/context/PageContext";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { useEffect, useState } from "react";

interface checkoutItemHookProps {
  checkoutItem: CheckoutTicket;
}

interface checkoutItemHook {
  isExtendOpen: boolean;
  handleCheckout: () => void;
  handleReturn: () => void;
  handleExtendOpen: () => void;
  handleExtend: (value: number) => void;
  handleDeleteCheckout: () => void;
}

export const useCheckoutItem = ({
  checkoutItem,
}: checkoutItemHookProps): checkoutItemHook => {
  const { setSnackBarError } = usePageContext();
  const [isExtendOpen, setIsExtendOpen] = useState<boolean>(false);
  const {
    mutateAsync: updateCheckoutTicket,
    isError: isUpdateCheckoutError,
    isSuccess: isUpdateCheckoutSuccess,
  } = useUpdateCheckoutAPI();

  const {
    mutateAsync: deleteCheckoutTicket,
    isError: isDeleteCheckoutError,
    isSuccess: isDeleteCheckoutSuccess,
  } = useDeleteCheckoutAPI();

  // todo update checked out books for this user
  const handleCheckout = () => {
    updateCheckoutTicket({
      checkOutTicket: {
        ...checkoutItem,
        checkedOutOn: new Date(),
        isCheckedOut: true,
      },
    });
  };

  // todo update returned books for this user
  const handleReturn = () => {
    updateCheckoutTicket({
      checkOutTicket: {
        ...checkoutItem,
        returnedDate: new Date(),
        isReturned: true,
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

  const handleExtendOpen = () => {
    setIsExtendOpen(!isExtendOpen);
  };

  // todo update reserved books for this user
  const handleDeleteCheckout = () => {
    deleteCheckoutTicket({ checkoutID: checkoutItem.ID });
  };

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

  return {
    isExtendOpen,
    handleCheckout,
    handleReturn,
    handleExtendOpen,
    handleExtend,
    handleDeleteCheckout,
  };
};
