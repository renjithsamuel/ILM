import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useModifyCountStyles } from "./ModifyCount.styles";
import { useModifyCount } from "./ModifyCount.hooks";
import { Dispatch, SetStateAction } from "react";
import { Book } from "@/entity/Book/Book";

interface modifyCountParams {
  setIsModifyCountOpen: Dispatch<SetStateAction<boolean | undefined>>;
  book: Book;
}

export const ModifyCount = ({
  setIsModifyCountOpen,
  book,
}: modifyCountParams) => {
  const {
    stockValue,
    fullScreen,
    openDialog,
    handleCloseDialog,
    handleUpdateQuantity,
    handleStockValue,
  } = useModifyCount({
    setIsModifyCountOpen,
    book,
  });
  const classes = useModifyCountStyles();
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box className={classes.modifyCountRoot}>
          <Box className={classes.countLabel}>{"Modify Book Count"}</Box>
          <Box>
            <TextField
              required
              id="outlined-required"
              label="Count"
              type="number"
              defaultValue={stockValue}
              onChange={(e) => handleStockValue(parseInt(e.target.value))}
            />
          </Box>
          <Box className={classes.countBtns}>
            <Button
              variant="contained"
              className={classes.countBtn}
              onClick={handleUpdateQuantity}
            >
              Update
            </Button>
            <Button
              variant="contained"
              className={classes.countBtn}
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
