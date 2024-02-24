import { Tooltip } from "@material-ui/core";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useSearchDialogStyles } from "./SearchDialog.styles";
import { themeValues } from "@/constants/ThemeConstants";
import Link from "next/link";
import { IBookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { useSearchDialog } from "./SearchDialog.hooks";
import { SetStateAction } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  EntityTypes,
  SearchSortValue,
  SortOrder,
} from "@/constants/GlobalConstants";
import { SearchItem } from "@/entity/SearchItem/SearchItem";
import { SearchItemComponent } from "../SearchItem/SearchItem";

interface searchDialogParams {
  setIsSearchClicked: (value: SetStateAction<boolean>) => void;
}

export const SearchDialog = ({ setIsSearchClicked }: searchDialogParams) => {
  const {
    fullScreen,
    openDialog,
    sortByOrder,
    sortByValue,
    searchResultList,
    sortByEntity,
    handleSearch,
    handleClickOpenDialog,
    handleCloseDialog,
    handleSortValue,
    handleSortOrder,
    handleSortEntity,
  } = useSearchDialog({ setIsSearchClicked });
  const classes = useSearchDialogStyles();

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box className={classes.searchDialogContentRoot}>
          {/*search input box */}
          <Box className={classes.searchInputWrap}>
            <input
              placeholder="What are you looking for?"
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
          {/* sort by container */}
          <Box className={classes.sortByContainer}>
            {/* sort by */}
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-controlled-open-select-label">
                Sort By
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={sortByValue}
                label="Sort By"
                onChange={handleSortValue}
              >
                <MenuItem value={SearchSortValue.userViews}>
                  user views
                </MenuItem>
                <MenuItem value={SearchSortValue.username}>username</MenuItem>
                <MenuItem value={SearchSortValue.email}>email</MenuItem>
                <MenuItem value={SearchSortValue.wishlistCount}>
                  wishlist count
                </MenuItem>
                <MenuItem value={SearchSortValue.bookViews}>
                  book views
                </MenuItem>

                <MenuItem value={SearchSortValue.booksLeft}>
                  books left
                </MenuItem>
                <MenuItem value={SearchSortValue.title}>title</MenuItem>
                <MenuItem value={SearchSortValue.author}>author</MenuItem>
                <MenuItem value={SearchSortValue.genre}>genre</MenuItem>
                <MenuItem value={SearchSortValue.publishedDate}>
                  published date
                </MenuItem>
                <MenuItem value={SearchSortValue.shelfNumber}>
                  shelf number
                </MenuItem>
              </Select>
            </FormControl>
            {/* order */}
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-controlled-open-select-label">
                Order By
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={sortByOrder}
                label="Order By"
                onChange={handleSortOrder}
              >
                <MenuItem value={SortOrder.asc}>Ascending</MenuItem>
                <MenuItem value={SortOrder.desc}>Descending</MenuItem>
              </Select>
            </FormControl>
            {/* Entity */}
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-controlled-open-select-label">
                Entity
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={sortByEntity}
                label="Order By"
                onChange={handleSortEntity}
              >
                <MenuItem value={EntityTypes.BookEntity}>Book</MenuItem>
                <MenuItem value={EntityTypes.UserEntity}>User</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* devider */}
          <Divider />
          {/* search items */}
          {searchResultList &&
            searchResultList.length > 0 &&
            searchResultList.map((searchItem, index) => {
              return (
                <SearchItemComponent searchItem={searchItem} handleCloseDialog={handleCloseDialog} key={index} />
              );
            })}
        </Box>
      </Dialog>
    </>
  );
};
