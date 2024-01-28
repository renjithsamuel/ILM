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
  const { handleSearch, currentSideMenu, handleSideMenuClick } = useNavBar();
  const classes = useNavBarStyles();

  console.log(currentSideMenu);

  return (
    <Box>
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
                placeholder="Search field"
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
      <Box display={"flex"}>
        <Box className={classes.sideNavContainer}>
          {menuItems.map((menuItem, index) => {
            return (
              <Box
                key={index}
                onClick={() => handleSideMenuClick(menuItem.link)}
                className={clsx(classes.sideMenuItem, {
                  [classes.currentSideMenu]: currentSideMenu === menuItem.link,
                })}
              >
                <menuItem.icon />
                <Typography variant="body1">{menuItem.name}</Typography>
              </Box>
            );
          })}
          <Box
            className={clsx(classes.sideMenuItem,classes.settingsMenu, {
              [classes.currentSideMenu]:
                currentSideMenu === sideMenuItems.Settings.link,
            })}
            onClick={() => handleSideMenuClick(sideMenuItems.Settings.link)}
          >
            <IoSettingsOutline />
            <Typography variant="body1">
              {sideMenuItems.Settings.name}
            </Typography>
          </Box>
        </Box>
        {/* page main content */}
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
