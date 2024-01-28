import { globalConstants } from "@/constants/GlobalConstants";
import { usePageContext } from "@/context/PageContext";
import { debounce } from "@/utils/debounce";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface navBarHook {
  currentSideMenu: string;
  handleSearch: (val: string) => void;
  handleSideMenuClick: (menulink: string) => void;
}

export const useNavBar = (): navBarHook => {
  const router = useRouter();
  const { setSearchText, currentSideMenu } = usePageContext();

  const handleSearch = debounce((value: string) => {
    if (value && value != "" && value.length > 0) {
      setSearchText(value);
      console.log(value);
    }
  }, globalConstants.debounceDelay);

  const handleSideMenuClick = (menulink: string) => {
    if (menulink && menulink != "" && menulink.length > 0) {
      router.push(menulink);
    }
  };

  useEffect(() => {
    console.log("curr-menu", currentSideMenu);
  }, [currentSideMenu]);
  
  return {
    currentSideMenu,
    handleSearch,
    handleSideMenuClick,
  };
};
