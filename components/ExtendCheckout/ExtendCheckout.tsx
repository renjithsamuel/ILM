import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Book } from "@/entity/Book/Book";
import { useExtendCheckoutStyles } from "./ExtendCheckout.styles";
import { useExtendCheckout } from "./ExtendCheckout.hooks";

interface extendCheckoutParams {
  numberOfDays: number;
  handleExtendOpen: () => void;
  handleExtend: (value: number) => void;
}

export const ExtendCheckout = ({
  handleExtendOpen,
  handleExtend,
  numberOfDays,
}: extendCheckoutParams) => {
  const {
    extendedDays,
    fullScreen,
    openDialog,
    handleCloseDialog,
    handleModifyDays,
  } = useExtendCheckout({ numberOfDays, handleExtendOpen });
  const classes = useExtendCheckoutStyles();
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box className={classes.extendCheckoutRoot}>
          <Box className={classes.countLabel}>{"Modify Check Out Days"}</Box>
          <Box>
            <TextField
              required
              id="outlined-required"
              label="Count"
              type="number"
              defaultValue={extendedDays}
              onChange={(e) => handleModifyDays(parseInt(e.target.value))}
            />
          </Box>
          <Box className={classes.countBtns}>
            <Button
              variant="contained"
              className={classes.countBtn}
              onClick={() => {
                handleExtend(extendedDays);
                handleCloseDialog();
              }}
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
