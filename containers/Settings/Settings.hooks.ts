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
}

export const useSettings = ({}: settingsHookProps): settingsHook => {
  const { user, setUser, setAuthenticated } = useUserContext();

  const [theme, setTheme] = useState<string>("light");

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

  return {
    user,
    theme,
    handleTheme,
    handleLogout,
  };
};
