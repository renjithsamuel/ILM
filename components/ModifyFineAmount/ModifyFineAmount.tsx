import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useModifyFineAmountStyles } from "./ModifyFineAmount.styles";
import { useModifyFineAmount } from "./ModifyFineAmount.hooks";
import { Dispatch, SetStateAction } from "react";
import { Book } from "@/entity/Book/Book";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";

interface modifyFineAmountParams {
  handleModifyFineAmount: () => void;
  checkoutItem: CheckoutTicket;
}

export const ModifyFineAmount = ({
  handleModifyFineAmount,
  checkoutItem,
}: modifyFineAmountParams) => {
  const {
    fineAmount,
    fullScreen,
    openDialog,
    handleCloseDialog,
    handleFineAmount,
    handleUpdateFineAmount,
  } = useModifyFineAmount({
    handleModifyFineAmount,
    checkoutItem,
  });
  const classes = useModifyFineAmountStyles();
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box className={classes.modifyFineAmountRoot}>
          <Box className={classes.countLabel}>{"Modify Fine Amount"}</Box>
          <Box>
            <TextField
              required
              id="outlined-required"
              label="Fine Amount"
              type="number"
              defaultValue={fineAmount}
              onChange={(e) => handleFineAmount(parseInt(e.target.value))}
            />
          </Box>
          <Box className={classes.countBtns}>
            <Button
              variant="contained"
              className={classes.countBtn}
              onClick={handleUpdateFineAmount}
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
