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
import { LoginDialog } from "@/components/LoginDialog/LoginDialog";
import { UnAuthorizedPage } from "@/components/UnAuthorizedPage/UnAuthorizedPage";
import { ConnectingToServerDialog } from "@/components/ConnectingToServerDialog/ConnectingToServerDialog";

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
    inUnauthorizedPage,
  } = useBaseLayout({
    authenticatedOnly,
  });

  const classes = useBaseLayoutStyles();

  if (inUnauthorizedPage) {
    return <UnAuthorizedPage />;
  }

  if (authenticatedOnly) {
    return (
      <Box>
        {/* <LoginDialog /> */}
        {false ? (
          <ConnectingToServerDialog />
        ) : (
          (!authenticated || !isSuccess) && <LoginDialog />
        )}
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
