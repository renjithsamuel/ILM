import { queryClient } from "@/api";
import { useUpdateBookQuantityAPI } from "@/api/Book/updateBookQuantity";
import { QueryKeys } from "@/constants/Querykeys";
import { usePageContext } from "@/context/PageContext";
import { Book } from "@/entity/Book/Book";
import { useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface modifyCountHookProps {
  book: Book;
  setIsModifyCountOpen: Dispatch<SetStateAction<boolean | undefined>>;
}

interface modifyCountHook {
  stockValue: number;
  fullScreen: boolean;
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleStockValue: (value: number) => void;
  handleUpdateQuantity: () => Promise<void>;
}

export const useModifyCount = ({
  setIsModifyCountOpen,
  book,
}: modifyCountHookProps): modifyCountHook => {
  // for search dialog box
  const { setSnackBarError } = usePageContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [stockValue, setStockValue] = useState<number>(book.booksLeft);

  const {
    mutateAsync: updateBookQuantity,
    isError: isUpdateBookQuantityError,
    isSuccess: isUpdateBookQuantitySuccess,
  } = useUpdateBookQuantityAPI();

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsModifyCountOpen(false);
  };

  const handleUpdateQuantity = async () => {
    await updateBookQuantity({ book: { ...book, booksLeft: stockValue } });
    handleCloseDialog()
  };

  const handleStockValue = (value: number) => {
    setStockValue(value);
  };

  useEffect(() => {
    if (isUpdateBookQuantityError) {
      setSnackBarError({
        ErrorMessage: "update quantity failed",
        ErrorSeverity: "error",
      });
    }
  }, [isUpdateBookQuantityError]);

  useEffect(() => {
    if (isUpdateBookQuantitySuccess) {
      setSnackBarError({
        ErrorMessage: "quantity updated",
        ErrorSeverity: "success",
      });
    }
  }, [isUpdateBookQuantitySuccess]);

  return {
    stockValue,
    fullScreen,
    openDialog,
    handleCloseDialog,
    handleStockValue,
    handleUpdateQuantity,
  };
};
