import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
  Button,
} from "@mui/material";
import { useBaseLayout } from "./BaseLayout.hooks";
import { NavBar } from "@/components/NavBar/NavBar";
import { AlertSnackbar } from "@/components/AlertSnackbar/AlertSnackbar";
import { Role } from "@/constants/Role";
import { FC, ReactNode } from "react";
import { useBaseLayoutStyles } from "./BaseLayout.styles";
import Link from "next/link";
import { themeValues } from "@/constants/ThemeConstants";

interface BaseLayoutProps {
  showSearchBar?: boolean;
  showMenuBar?: boolean;
  authenticatedOnly?: boolean;
  roleAllowed?: Role;
  pageName: string;
  children?: ReactNode;
}

// todo update this to check for role allowed vs current user role,
// todo  if not allowed show not allowed and redirect button to home page
export const BaseLayout: FC<BaseLayoutProps> = ({
  authenticatedOnly = true,
  showSearchBar = true,
  showMenuBar = true,
  roleAllowed = Role.Both,
  pageName,
  children,
}) => {
  const {
    authenticated,
    isError,
    isSuccess,
    isLoading,
    isFetched,
    user,
    alertSnackbarMessage,
    handleCloseAlertSnackbar,
    isAlertSnackbarOpen,
    menuItems,
  } = useBaseLayout({
    authenticatedOnly,
  });

  const classes = useBaseLayoutStyles();

  if (authenticatedOnly) {
    if (isLoading) {
      return (
        <Box className={classes.progressBarContainer}>
          <CircularProgress />
        </Box>
      );
    }

    if (isFetched && !authenticated) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
          gap={4}
        >
          <Typography variant="h2">403 - Forbidden</Typography>
          <Typography variant="h5" color="textSecondary">
            You Need To Log In To Access
          </Typography>
          <Link href="/login">
            <Button
              variant="contained"
              sx={{
                color: themeValues.color.textColor,
                backgroundColor: themeValues.color.color1,
                "&:hover": {
                  backgroundColor: themeValues.color.color3,
                },
              }}
            >
              Go to Login
            </Button>
          </Link>
        </Box>
      );
    }

    if (isFetched && isSuccess && authenticated) {
      return (
        <Box>
          <NavBar showSearchBar pageName={pageName} menuItems={menuItems}>
            {children}
          </NavBar>
          <AlertSnackbar open={isAlertSnackbarOpen}>
            <Alert
              onClose={handleCloseAlertSnackbar}
              severity={alertSnackbarMessage?.severity}
            >
              {alertSnackbarMessage?.message}
            </Alert>
          </AlertSnackbar>
        </Box>
      );
    }
  }

  return (
    <Box>
      <NavBar showSearchBar pageName={pageName} menuItems={menuItems}>
        {children}
      </NavBar>
      <AlertSnackbar open={isAlertSnackbarOpen}>
        <Alert
          onClose={handleCloseAlertSnackbar}
          severity={alertSnackbarMessage?.severity}
        >
          {alertSnackbarMessage?.message}
        </Alert>
      </AlertSnackbar>
    </Box>
  );
};
