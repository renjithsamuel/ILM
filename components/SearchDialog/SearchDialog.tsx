import {
  Box,
  Dialog,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
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
  SearchByValue,
  SearchSortValue,
  SortOrder,
  SortPresence,
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
    searchByValue,
    handleSearch,
    handleClickOpenDialog,
    handleCloseDialog,
    handleSortValue,
    handleSortOrder,
    handleSortEntity,
    handleSearchByValue,
    // pagination and sorting
    totalPages,
    pageNumber,
    rowsPerPage,
    handleRowsPerPage,
    handlePageNumber,
  } = useSearchDialog({ setIsSearchClicked });
  const classes = useSearchDialogStyles();

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        sx={{
          backdropFilter: "blur(2px)",
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "fit-content", // Set your width here
            },
          },
        }}
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
                {sortByEntity === EntityTypes.UserEntity
                  ? sortByValueItems.userSortByValues.map((item, index) => {
                      return (
                        <MenuItem value={item.value} key={index}>
                          {item.label}
                        </MenuItem>
                      );
                    })
                  : sortByEntity === EntityTypes.BookEntity
                    ? sortByValueItems.bookSortByValues.map((item, index) => {
                        return (
                          <MenuItem value={item.value} key={index}>
                            {item.label}
                          </MenuItem>
                        );
                      })
                    : [
                        ...sortByValueItems.bookSortByValues,
                        ...sortByValueItems.userSortByValues,
                      ].map((item, index) => {
                        return (
                          <MenuItem value={item.value} key={index}>
                            {item.label}
                          </MenuItem>
                        );
                      })}
              </Select>
            </FormControl>
            {/* order */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
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
            {/* search by */}
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-controlled-open-select-label">
                Search By
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={searchByValue}
                label="Search By"
                onChange={handleSearchByValue}
              >
                {sortByEntity === EntityTypes.UserEntity
                  ? searchByValues.userSearchByValues.map((item, index) => {
                      return (
                        <MenuItem value={item.value} key={index}>
                          {item.label}
                        </MenuItem>
                      );
                    })
                  : sortByEntity === EntityTypes.BookEntity
                    ? searchByValues.bookSearchByValues.map((item, index) => {
                        return (
                          <MenuItem value={item.value} key={index}>
                            {item.label}
                          </MenuItem>
                        );
                      })
                    : [
                        ...searchByValues.userSearchByValues,
                        ...searchByValues.bookSearchByValues,
                      ].map((item, index) => {
                        return (
                          <MenuItem value={item.value} key={index}>
                            {item.label}
                          </MenuItem>
                        );
                      })}
              </Select>
            </FormControl>
          </Box>
          {/* devider */}
          <Divider />
          {/* search items */}
          <Box className={classes.searchItems}>
            {searchResultList &&
              searchResultList.length > 0 &&
              searchResultList.map((searchItem, index) => {
                return (
                  <SearchItemComponent
                    searchItem={searchItem}
                    handleCloseDialog={handleCloseDialog}
                    key={index}
                  />
                );
              })}
          </Box>
          {/* pagination */}
          <Box className={classes.paginationWrap}>
            <TablePagination
              component="div"
              count={totalPages}
              page={pageNumber}
              onPageChange={handlePageNumber}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPage}
            />
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

const sortByValueItems = {
  userSortByValues: [
    {
      value: SearchSortValue.userViews,
      label: "user views",
    },
    {
      value: SearchSortValue.username,
      label: "username",
    },
    {
      value: SearchSortValue.email,
      label: "email",
    },
  ],
  bookSortByValues: [
    {
      value: SearchSortValue.reviewCount,
      label: "book reviews",
    },
    {
      value: SearchSortValue.bookViews,
      label: "book rating",
    },
    {
      value: SearchSortValue.bookViews,
      label: "book views",
    },
    {
      value: SearchSortValue.wishlistCount,
      label: "wishlist count",
    },
    {
      value: SearchSortValue.booksLeft,
      label: "books left",
    },
    {
      value: SearchSortValue.title,
      label: "title",
    },
    {
      value: SearchSortValue.author,
      label: "author",
    },
    {
      value: SearchSortValue.genre,
      label: "genre",
    },
    {
      value: SearchSortValue.publishedDate,
      label: "published date",
    },
    {
      value: SearchSortValue.shelfNumber,
      label: "shelf number",
    },
  ],
};

const searchByValues = {
  bookSearchByValues: [
    {
      value: SearchByValue.author,
      label: "Author",
    },
    {
      value: SearchByValue.title,
      label: "Title",
    },
    {
      value: SearchByValue.genre,
      label: "Genre",
    },
    {
      value: SearchByValue.isbn,
      label: "ISBN",
    },
  ],
  userSearchByValues: [
    {
      value: SearchByValue.email,
      label: "Email",
    },
    {
      value: SearchByValue.username,
      label: "Name",
    },
  ],
};
