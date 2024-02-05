import { globalConstants } from "@/constants/GlobalConstants";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { User } from "@/entity/User/User";
import { debounce } from "@/utils/debounce";
import { useRouter } from "next/router";

interface navBarHook {
  user: User;
  currentSideMenu: string;
  handleSearch: (val: string) => void;
  handleSideMenuClick: (menulink: string) => void;
}

export const useNavBar = (): navBarHook => {
  const router = useRouter();
  const { setSearchText, currentSideMenu } = usePageContext();
  const { user } = useUserContext();

  const handleSearch = debounce((value: string) => {
    if (value && value != "" && value.length > 0) {
      setSearchText(value);
      console.log(value);
    }
  }, globalConstants.debounceDelay);

  const handleSideMenuClick = (menulink: string) => {
    if (menulink && menulink != "" && menulink.length > 0) {
      router.replace(menulink);
    }
  };

  return {
    user,
    currentSideMenu,
    handleSearch,
    handleSideMenuClick,
  };
};
