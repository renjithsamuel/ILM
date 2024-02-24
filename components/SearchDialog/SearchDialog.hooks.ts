import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { SetStateAction, useState } from "react";

interface searchDialogHookProps {
  setIsSearchClicked: (value: SetStateAction<boolean>) => void;
}

interface searchDialogHook {
  fullScreen: boolean;
  openDialog: boolean;
  handleClickOpenDialog: () => void;
  handleCloseDialog: () => void;
}

export const useSearchDialog = ({
  setIsSearchClicked,
}: searchDialogHookProps): searchDialogHook => {
  // for search dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(true);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsSearchClicked(false);
  };

  return {
    fullScreen,
    openDialog,
    handleClickOpenDialog,
    handleCloseDialog,
  };
};
