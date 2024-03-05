import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useModifyCountStyles } from "./ModifyCount.styles";
import { useModifyCount } from "./ModifyCount.hooks";
import { Dispatch, SetStateAction } from "react";

interface modifyCountParams {
  setIsModifyCountOpen: Dispatch<SetStateAction<boolean | undefined>>;
}

export const ModifyCount = ({ setIsModifyCountOpen }: modifyCountParams) => {
  const { fullScreen, openDialog, handleCloseDialog } = useModifyCount({
    setIsModifyCountOpen,
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
              defaultValue={0}
            />
          </Box>
          <Box className={classes.countBtns}>
            <Button variant="contained" className={classes.countBtn}>
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
