import { Box, TextField, Typography } from "@mui/material";
import { useNavBarStyles } from "./NavBar.styles";
import { IoIosSearch } from "react-icons/io";
import { themeValues } from "@/constants/ThemeConstants";
import { useNavBar } from "./NavBar.hooks";
import { useUserContext } from "@/context/UserContext";
import { SideNavItem } from "@/types/SideNav";
import { IoSettingsOutline } from "react-icons/io5";
import { ImLibrary } from "react-icons/im";
import clsx from "clsx";
import { sideMenuItems } from "@/constants/GlobalConstants";
import { ReactNode } from "react";
import Link from "next/link";
import { Role } from "@/constants/Role";

interface NavBarProps {
  showSearchBar: boolean;
  pageName?: string;
  menuItems: SideNavItem[];
  children?: ReactNode;
}

export const NavBar = ({
  showSearchBar,
  pageName,
  menuItems,
  children,
}: NavBarProps) => {
  const { handleSearch, currentSideMenu, user } = useNavBar();
  const classes = useNavBarStyles();

  console.log(currentSideMenu);

  return (
    <Box className={classes.navBarRoot}>
      {/* top nav bar */}
      <Box className={classes.topNavBarRoot}>
        <Box className={classes.topNavBarContainer}>
          {/*  app label */}
          <Box className={classes.libraryName}>
            <ImLibrary size={themeValues.spacing(3)} />
            <Typography variant="h5">Library</Typography>
          </Box>
          {/* current page name */}
          {pageName && <Typography variant="h5">{pageName}</Typography>}
          {/* search bar */}
          {showSearchBar && (
            <Box className={classes.searchInputWrap}>
              <input
                placeholder="Search"
                type="text"
                name="searchBar"
                className={classes.searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {/* search Icon */}
              <IoIosSearch
                size={themeValues.spacing(2.5)}
                color={themeValues.color.color1}
              />
            </Box>
          )}
        </Box>
      </Box>
      {/* side nav bar */}
      <Box
        display={"flex"}
        width={"100%"}
      >
        <Box className={classes.sideNavContainer}>
          {menuItems.map((menuItem, index) => {
            return (
              <Link key={index} href={menuItem?.link}>
                <Box
                  // onClick={() => handleSideMenuClick(menuItem.link)}
                  className={clsx(classes.sideMenuItem, {
                    [classes.currentSideMenu]:
                      currentSideMenu === menuItem.link,
                  })}
                >
                  <menuItem.icon />
                  <Typography variant="body1">{menuItem.name}</Typography>
                </Box>
              </Link>
            );
          })}
          <Link href={sideMenuItems.Settings.link}>
            {" "}
            <Box
              className={clsx(classes.sideMenuItem, classes.settingsMenu, {
                [classes.currentSideMenu]:
                  currentSideMenu === sideMenuItems.Settings.link,
              })}
              sx={{
                marginTop:
                  user.role == Role.Librarian
                    ? themeValues.spacing(35)
                    : themeValues.spacing(50),
              }}
              // onClick={() => handleSideMenuClick(sideMenuItems.Settings.link)}
            >
              <IoSettingsOutline />
              <Typography variant="body1">
                {sideMenuItems.Settings.name}
              </Typography>
            </Box>
          </Link>
        </Box>
        {/* page main content */}
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
