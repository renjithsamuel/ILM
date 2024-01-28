import { Alert, Box, Snackbar } from "@mui/material";
import { useBaseLayout } from "./BaseLayout.hooks";
import { NavBar } from "@/components/NavBar/NavBar";
import { AlertSnackbar } from "@/components/AlertSnackbar/AlertSnackbar";
import { Role } from "@/constants/Role";

interface BaseLayoutParams {
  showSearchBar?: boolean;
  showMenuBar?: boolean;
  authenticatedOnly?: boolean;
  roleAllowed?: Role;
  pageName: string;
}

// todo update this to check for role allowed vs current user role,
// todo  if not allowed show not allowed and redirect button to home page
export const BaseLayout = ({
  authenticatedOnly = true,
  showSearchBar = true,
  showMenuBar = true,
  roleAllowed = Role.Both,
  pageName,
}: BaseLayoutParams) => {
  const {
    authenticated,
    isError,
    isSuccess,
    user,
    alertSnackbarMessage,
    handleCloseAlertSnackbar,
    isAlertSnackbarOpen,
    menuItems,
  } = useBaseLayout({
    authenticatedOnly,
  });

  if (authenticatedOnly) {
    return (
      <Box>
        <NavBar showSearchBar pageName={pageName} menuItems={menuItems}/>
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
      <NavBar showSearchBar pageName={pageName} menuItems={menuItems} />

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
