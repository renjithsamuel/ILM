import { Tooltip } from "@material-ui/core";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useSearchDialogStyles } from "./SearchDialog.styles";
import { themeValues } from "@/constants/ThemeConstants";
import Link from "next/link";
import { IBookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { useSearchDialog } from "./SearchDialog.hooks";
import { SetStateAction } from "react";

interface searchDialogParams {
  setIsSearchClicked: (value: SetStateAction<boolean>) => void;
}

export const SearchDialog = ({ setIsSearchClicked }: searchDialogParams) => {
  const { fullScreen, openDialog, handleClickOpenDialog, handleCloseDialog } =
    useSearchDialog({ setIsSearchClicked });
  const classes = useSearchDialogStyles();
  
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Disagree
          </Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
