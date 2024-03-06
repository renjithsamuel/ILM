import { useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface addCommentHookProps {
  handleAddComment: () => void;
}

interface addCommentHook {
  fullScreen: boolean;
  openDialog: boolean;
  ratingValue: number | null;
  handleRatingValue: (newValue: number | null) => void;
  handleCloseDialog: () => void;
}

export const useAddComment = ({
  handleAddComment,
}: addCommentHookProps): addCommentHook => {
  // for search dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleAddComment();
  };

  const handleRatingValue = (newValue: number | null) => {
    console.log(newValue);
    setRatingValue(newValue);
  };

  return {
    fullScreen,
    openDialog,
    ratingValue,
    handleRatingValue,
    handleCloseDialog,
  };
};
