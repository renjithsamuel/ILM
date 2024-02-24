import { globalConstants } from "@/constants/GlobalConstants";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { User } from "@/entity/User/User";
import { debounce } from "@/utils/debounce";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";

interface navBarHook {
  user: User;
  currentSideMenu: string;
  isSearchClicked: boolean;
  DialogBox: (({}: any) => JSX.Element) | undefined;
  handleSearch: (val: string) => void;
  handleSideMenuClick: (menulink: string) => void;
  handleSearchClick: () => void;
  setIsSearchClicked: (value: SetStateAction<boolean>) => void;
}

export const useNavBar = (): navBarHook => {
  const router = useRouter();
  const { setSearchText, currentSideMenu, DialogBox } = usePageContext();
  const { user } = useUserContext();
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

  const handleSearch = debounce((value: string) => {
    if (value && value != "" && value.length > 0) {
      setSearchText(value);
    }
  }, globalConstants.debounceDelay);

  const handleSideMenuClick = (menulink: string) => {
    if (menulink && menulink != "" && menulink.length > 0) {
      router.replace(menulink);
    }
  };

  const handleSearchClick = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  return {
    user,
    currentSideMenu,
    isSearchClicked,
    DialogBox,
    handleSearch,
    handleSideMenuClick,
    handleSearchClick,
    setIsSearchClicked,
  };
};
