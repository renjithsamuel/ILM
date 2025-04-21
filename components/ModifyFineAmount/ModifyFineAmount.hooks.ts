import { useUpdateCheckoutAPI } from "@/goconnection/Checkout/updateCheckout";
import { usePageContext } from "@/context/PageContext";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface modifyFineAmountHookProps {
  checkoutItem: CheckoutTicket;
  handleModifyFineAmount: () => void;
}

interface modifyFineAmountHook {
  fineAmount: number;
  fullScreen: boolean;
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleFineAmount: (value: number) => void;
  handleUpdateFineAmount: () => Promise<void>;
}

export const useModifyFineAmount = ({
  handleModifyFineAmount,
  checkoutItem,
}: modifyFineAmountHookProps): modifyFineAmountHook => {
  // for search dialog box
  const { setSnackBarError } = usePageContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [fineAmount, setFineAmount] = useState<number>(checkoutItem.fineAmount);

  const {
    mutateAsync: updateCheckoutTicket,
    isError: isUpdateCheckoutError,
    isSuccess: isUpdateCheckoutSuccess,
  } = useUpdateCheckoutAPI();

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleModifyFineAmount();
    false;
  };

  const handleUpdateFineAmount = async () => {
    await updateCheckoutTicket({
      checkOutTicket: { ...checkoutItem, fineAmount: fineAmount },
    });
    handleCloseDialog();
  };

  const handleFineAmount = (value: number) => {
    setFineAmount(value);
  };

  useEffect(() => {
    if (isUpdateCheckoutError) {
      setSnackBarError({
        ErrorMessage: "update fine failed",
        ErrorSeverity: "error",
      });
    }
  }, [isUpdateCheckoutError]);

  useEffect(() => {
    if (isUpdateCheckoutSuccess) {
      setSnackBarError({
        ErrorMessage: "fine updated",
        ErrorSeverity: "success",
      });
    }
  }, [isUpdateCheckoutSuccess]);

  return {
    fineAmount,
    fullScreen,
    openDialog,
    handleCloseDialog,
    handleFineAmount,
    handleUpdateFineAmount,
  };
};
