import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import { useConnectingToServerDialogStyles } from "./ConnectingToServerDialog.styles";
import { themeValues } from "@/constants/ThemeConstants";
import { useConnectingToServerDialog } from "./ConnectingToServerDialog.hooks";

interface loginDialogParams {}

export const ConnectingToServerDialog = ({}: loginDialogParams) => {
  const { fullScreen } = useConnectingToServerDialog({});
  const classes = useConnectingToServerDialogStyles();
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        aria-labelledby="responsive-dialog-title"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box className={classes.progressBarContainer}>
          <Typography
            variant="h5"
            sx={{ fontWeight: themeValues.font.fontWeightThick }}
          >
            {" "}
            {"Connecting to Server"}
          </Typography>
          <CircularProgress sx={{ color: themeValues.color.white }} />
        </Box>
      </Dialog>
    </>
  );
};
