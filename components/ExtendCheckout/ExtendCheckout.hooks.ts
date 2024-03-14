import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

interface extendCheckoutHookProps {
  numberOfDays: number;
  handleExtendOpen: () => void;
}

interface extendCheckoutHook {
  extendedDays: number;
  fullScreen: boolean;
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleModifyDays: (val: number) => void
}

export const useExtendCheckout = ({
  numberOfDays,
  handleExtendOpen,
}: extendCheckoutHookProps): extendCheckoutHook => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [extendedDays, setExtendedDays] = useState<number>(numberOfDays);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleExtendOpen();
  };

  const handleModifyDays = (val: number) => {
    setExtendedDays(val);
  };

  return {
    extendedDays,
    fullScreen,
    openDialog,
    handleCloseDialog,
    handleModifyDays,
  };
};
