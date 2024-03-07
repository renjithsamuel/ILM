import { Theme } from "@material-ui/core";
import {
  Snackbar,
  SnackbarOrigin,
  SnackbarProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";

export type AlertSnackbarProps = SnackbarProps;

export const AlertSnackbar: FC<AlertSnackbarProps> = ({
  children,
  anchorOrigin: anchorOriginProps,
  autoHideDuration,
  ...props
}) => {
  const customtheme = useTheme();
  const largeView = useMediaQuery<Theme>((theme: Theme) =>
    customtheme.breakpoints.up("sm"),
  );

  const anchorOrigin: SnackbarOrigin = largeView
    ? {
        vertical: "top",
        horizontal: "right",
      }
    : { vertical: "bottom", horizontal: "center" };

  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        ...anchorOrigin,
        ...anchorOriginProps,
      }}
      className={classes.snackbar}
      autoHideDuration={autoHideDuration || 4000}
      {...props}
    >
      {children}
    </Snackbar>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      left: 0,
      bottom: 0,
      "&>div": {
        width: "100vw",
        borderRadius: 0,
      },
    },
  },
}));
