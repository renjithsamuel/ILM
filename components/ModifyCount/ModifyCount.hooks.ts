import { useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface modifyCountHookProps {
  setIsModifyCountOpen: Dispatch<SetStateAction<boolean | undefined>>;
}

interface modifyCountHook {
  fullScreen: boolean;
  openDialog: boolean;
  handleCloseDialog: () => void;
}

export const useModifyCount = ({
  setIsModifyCountOpen,
}: modifyCountHookProps): modifyCountHook => {
  // for search dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsModifyCountOpen(false);
  };

  return {
    fullScreen,
    openDialog,
    handleCloseDialog,
  };
};
