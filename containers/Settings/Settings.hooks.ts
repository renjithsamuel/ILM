import { useUpdateUserAPI } from "@/goconnection/User/updateUser";
import { Role } from "@/constants/Role";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { Cookie } from "@/utils/cookies";
import { LocalStorage } from "@/utils/localstorage";
import { useEffect, useState } from "react";

interface settingsHookProps {}

interface settingsHook {
  user: User;
  theme: string;
  handleTheme: () => void;
  handleLogout: () => void;
  handleSwitchRole: (role: Role) => void;
  handlePayment: () => void;
}

export const useSettings = ({}: settingsHookProps): settingsHook => {
  const { user, setAuthenticated } = useUserContext();
  const { setSnackBarError } = usePageContext();
  const [theme, setTheme] = useState<string>("light");

  const {
    mutateAsync: updateUser,
    isSuccess: isUpdateUserSuccess,
    isError: isUpdateUserError,
  } = useUpdateUserAPI();

  const handleTheme = () => {
    const tempTheme = theme === "light" ? "dark" : "light";
    setTheme(tempTheme);
    // document.documentElement.setAttribute("data-theme", tempTheme);
    LocalStorage.setTheme = tempTheme;
    window.location.reload();
  };

  const handleLogout = () => {
    Cookie.logout();
    setAuthenticated(false);
  };

  const handleSwitchRole = (role: Role) => {
    updateUser({ user: { ...user, role: role } });
  };

  const handlePayment = () => {
    updateUser({ user: { ...user, isPaymentDone: true } });
  };

  useEffect(() => {
    if (isUpdateUserSuccess) {
      setSnackBarError({
        ErrorMessage: "role updated!",
        ErrorSeverity: "success",
      });
    }
  }, [isUpdateUserSuccess]);

  useEffect(() => {
    if (isUpdateUserError) {
      setSnackBarError({
        ErrorMessage: "get users failed!",
        ErrorSeverity: "error",
      });
    }
  }, [isUpdateUserError]);

  return {
    user,
    theme,
    handleTheme,
    handleLogout,
    handleSwitchRole,
    handlePayment,
  };
};
