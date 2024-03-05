import { useGetUserAPI } from "@/api/User/getUser";
import { globalConstants, sideMenuItems } from "@/constants/GlobalConstants";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { User } from "@/entity/User/User";
import {
  AlertSnackbarHook,
  useAlertSnackbar,
} from "@/hooks/AlertSnackBar.hooks";
import { Cookie } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { SideNavItem } from "@/types/SideNav";
import { ImBooks } from "react-icons/im";
import { LiaBookSolid } from "react-icons/lia";
import { Role } from "@/constants/Role";
import { mockUser } from "@/entity/User/User.mock";
import { GrTransaction } from "react-icons/gr";
import { IoAnalyticsOutline, IoHeartSharp } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { BsBookshelf } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useRouter } from "next/router";

type BaseLayoutHook = {
  user: User;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  isFetched: boolean;
  authenticated: boolean;
  menuItems: SideNavItem[];
  isAlertSnackbarOpen: AlertSnackbarHook["isAlertSnackbarOpen"];
  alertSnackbarMessage: AlertSnackbarHook["alertSnackbarMessage"];
  handleCloseAlertSnackbar: AlertSnackbarHook["handleCloseAlertSnackbar"];
};

type BaseLayoutParams = {
  authenticatedOnly: boolean;
};

export const useBaseLayout = ({
  authenticatedOnly,
}: BaseLayoutParams): BaseLayoutHook => {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<SideNavItem[]>([]);

  const { setUser, setAuthenticated, authenticated, user } = useUserContext();

  const { errorMessage, setErrorMessage, setCurrentSideMenu, currentSideMenu } =
    usePageContext();

  const getEmail = (): string => {
    let email = "";

    try {
      email = Cookie.email;
    } catch (e) {
      if (authenticatedOnly) throw e;
    }

    return email;
  };

  // const {
  //   data: getUserResponse,
  //   isError,
  //   isSuccess,
  //   isLoading,
  // isFetched,
  // } = useGetUserAPI(!!getEmail());
  // mocking
  const getUserResponse = { data: mockUser };
  const isError = false;
  const isSuccess = true;
  const isLoading = false;
  const isFetched = true;

  useEffect(() => {
    if (isSuccess) {
      // verify if token is present or not

      // todo remove this
      setAuthenticated(true);
      if (Cookie.access_token && Cookie.email) {
        setAuthenticated(true);
      }
      // else show pop up to login

      if (getUserResponse?.data) {
        setUser(new User(getUserResponse.data));
      }
    }
  }, [isSuccess]);

  const {
    alertSnackbarMessage,
    handleCloseAlertSnackbar,
    isAlertSnackbarOpen,
    openAlertSnackbar,
  } = useAlertSnackbar();

  useEffect(() => {
    if (isError) {
      openAlertSnackbar("Something went wrong!", "error");
    }
  }, [isError]);

  // call alert snackbar from where ever you want
  useEffect(() => {
    if (errorMessage !== "" && errorMessage?.length > 0) {
      openAlertSnackbar(errorMessage, "error");
      setErrorMessage("");
      setTimeout(() => {
        handleCloseAlertSnackbar(undefined, "timeout");
      }, globalConstants.snackBarDelay);
    }
  }, [errorMessage]);

  // todo wrap this inside use effect and update based on use role
  // side nav bar contents
  useEffect(() => {
    if (user && isSuccess) {
      let tempMenuItems: SideNavItem[];
      if (user.role === Role.Patrons) {
        tempMenuItems = [
          {
            name: sideMenuItems.BookShelf.name,
            icon: ImBooks,
            link: sideMenuItems.BookShelf.link,
          },
          {
            name: sideMenuItems.MyBooks.name,
            icon: LiaBookSolid,
            link: sideMenuItems.MyBooks.link,
          },
          {
            name: sideMenuItems.WishLists.name,
            icon: IoHeartSharp,
            link: sideMenuItems.WishLists.link,
          },
          {
            name: sideMenuItems.AllBooks.name,
            icon: BsBookshelf,
            link: sideMenuItems.AllBooks.link,
          },
        ];
      } else {
        tempMenuItems = [
          {
            name: sideMenuItems.Dashboard.name,
            icon: RiDashboardFill,
            link: sideMenuItems.Dashboard.link,
          },
          {
            name: sideMenuItems.Users.name,
            icon: FaUsers,
            link: sideMenuItems.Users.link,
          },
          {
            name: sideMenuItems.Transactions.name,
            icon: GrTransaction,
            link: sideMenuItems.Transactions.link,
          },
          {
            name: sideMenuItems.AllBooks.name,
            icon: BsBookshelf,
            link: sideMenuItems.AllBooks.link,
          },
          {
            name: sideMenuItems.PredictiveAnalysis.name,
            icon: IoAnalyticsOutline,
            link: sideMenuItems.PredictiveAnalysis.link,
          },
        ];
      }
      setMenuItems(tempMenuItems);
      // if no menu is selected select all books
      if (
        !currentSideMenu ||
        currentSideMenu === "" ||
        currentSideMenu.length === 0
      )
        setCurrentSideMenu(sideMenuItems.AllBooks.link);
    }
  }, [user]);

  // update current menu on path change
  useEffect(() => {
    if (router?.pathname) {
      console.log(router?.pathname?.split("/"));
      const tempCurrentMenu = router?.pathname?.split("/")[1];
      if (tempCurrentMenu) setCurrentSideMenu(`/${tempCurrentMenu}`);
    }
  }, [router?.pathname]);

  return {
    user,
    isSuccess,
    isFetched,
    isError,
    isLoading,
    authenticated,
    menuItems,
    alertSnackbarMessage,
    handleCloseAlertSnackbar,
    isAlertSnackbarOpen,
  };
};
