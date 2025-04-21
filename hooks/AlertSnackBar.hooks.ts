import { SyntheticEvent, useCallback, useState } from "react";
import { Color as SeverityColor } from "@material-ui/lab";
import { SnackbarCloseReason } from "@mui/material";
import { SnackbarMessage } from "@/components/SnackBarMessage/SnackBarMessage";

export interface AlertSnackbarHook {
  isAlertSnackbarOpen: boolean;
  handleCloseAlertSnackbar: (
    event?: SyntheticEvent,
    reason?: SnackbarCloseReason,
  ) => void;
  alertSnackbarMessage: SnackbarMessage | null;
  openAlertSnackbar: (message: string, severity: SeverityColor) => void;
}

export const useAlertSnackbar = (): AlertSnackbarHook => {
  const [isAlertSnackbarOpen, setIsAlertSnackbarOpen] = useState(false);

  const [alertSnackbarMessage, setAlertSnackbarMessage] =
    useState<SnackbarMessage | null>(null);

  const openAlertSnackbar: AlertSnackbarHook["openAlertSnackbar"] = useCallback(
    (message, severity) => {
      setAlertSnackbarMessage(new SnackbarMessage(message, severity));

      setIsAlertSnackbarOpen(true);
    },
    [],
  );

  const handleCloseAlertSnackbar: AlertSnackbarHook["handleCloseAlertSnackbar"] =
    useCallback((_, reason) => {
      // not to close snackbar on different user events on screen
      if (reason === "clickaway") {
        return;
      }

      setIsAlertSnackbarOpen(false);
    }, []);

  return {
    isAlertSnackbarOpen,
    handleCloseAlertSnackbar,
    alertSnackbarMessage,
    openAlertSnackbar,
  };
};
