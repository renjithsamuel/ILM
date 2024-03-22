import {
  EntityTypes,
  SearchByValue,
  SearchSortValue,
  SortOrder,
  SortPresence,
  globalConstants,
} from "@/constants/GlobalConstants";
import { SearchItem } from "@/entity/SearchItem/SearchItem";
import { debounce } from "@/utils/debounce";
import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { SetStateAction, useEffect, useReducer, useState } from "react";
import { mockSearchItems } from "@/entity/SearchItem/SearchItem.mock";
import {
  initialSearchDialogValues,
  searchDialogReducer,
} from "@/reducers/SearchDialog/searchDialog.reducer";
import { SearchDialogTypes } from "@/reducers/SearchDialog/searchDialog.types";
import { useSearchDialogAPI } from "@/api/Search/searchDialog";
import { FormatTextUtil } from "@/utils/formatText";
import { string } from "yup";

interface searchDialogHookProps {
  setIsSearchClicked: (value: SetStateAction<boolean>) => void;
}

interface searchDialogHook {
  fullScreen: boolean;
  openDialog: boolean;
  sortByOrder: SortOrder;
  sortByValue: SearchSortValue;
  searchByValue: SearchByValue;
  searchResultList: SearchItem[];
  sortByEntity: EntityTypes;
  handleClickOpenDialog: () => void;
  handleCloseDialog: () => void;
  handleSearch: (val: string) => void;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
  handleSearchByValue: (event: SelectChangeEvent) => void;
  handleSortEntity: (event: SelectChangeEvent) => void;
  // pagination
  totalPages: number;
  pageNumber: number;
  rowsPerPage: number;
  handleRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePageNumber: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ) => void;
}

export const useSearchDialog = ({
  setIsSearchClicked,
}: searchDialogHookProps): searchDialogHook => {
  // for search dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [state, dispatch] = useReducer(
    searchDialogReducer,
    initialSearchDialogValues
  );

  // api request
  const { data: searchListData, isError: isSearchError } = useSearchDialogAPI({
    limit: state.rowsPerPage,
    page: state.pageNumber,
    sortBy: state.sortByValue,
    orderBy: state.sortByOrder,
    searchBy: state.searchByValue,
    searchText: state.searchText,
    type: state.sortByEntity,
  });

  const handleClickOpenDialog = () => {
    dispatch({
      type: SearchDialogTypes.SetOpenDialog,
      payload: { openDialog: true },
    });
  };

  const handleCloseDialog = () => {
    dispatch({
      type: SearchDialogTypes.SetOpenDialog,
      payload: { openDialog: false },
    });
    setIsSearchClicked(false);
  };

  const handleSearch = debounce((value: string) => {
    dispatch({
      type: SearchDialogTypes.SetSearchText,
      payload: { searchText: value.trim().toLowerCase() },
    });
  }, globalConstants.debounceDelay);

  // send sort value and sort order to backend to get the sort values
  // get all books
  // give full freedom to sort from
  useEffect(() => {
    if (!!searchListData?.data.books || !!searchListData?.data.users) {
      let searchItems: SearchItem[] = [];
      // creating search Items
      switch (state.sortByEntity) {
        case EntityTypes.BookEntity:
          searchItems = searchListData?.data.books.map((book) => {
            return new SearchItem({
              entityID: book.ID,
              entityType: EntityTypes.BookEntity,
              views: book.views,
              bookDescription: FormatTextUtil.sliceText(book.desc),
              bookname: book.title,
              ISBN: book.ISBN,
            });
          });
          // dispatch
          dispatch({
            type: SearchDialogTypes.SetSearchResultList,
            payload: { searchResults: searchItems },
          });
          break;

        case EntityTypes.UserEntity:
          searchItems = searchListData?.data.users.map((user) => {
            return new SearchItem({
              entityID: user.userID,
              entityType: EntityTypes.UserEntity,
              views: user.views,
              emailID: user.email,
              username: user.name,
            });
          });
          // dispatch
          dispatch({
            type: SearchDialogTypes.SetSearchResultList,
            payload: { searchResults: searchItems },
          });
          break;

        default:
          break;
      }
    }
  }, [
    state.sortByOrder,
    state.sortByValue,
    state.sortByEntity,
    searchListData?.data.books,
    searchListData?.data.users,
  ]);

  // sorting
  const handleSortValue = (event: SelectChangeEvent): void => {
    event.target.value &&
      dispatch({
        type: SearchDialogTypes.SetSortByValue,
        payload: { sortByValue: event.target.value as SearchSortValue },
      });
  };

  const handleSearchByValue = (event: SelectChangeEvent): void => {
    event.target.value &&
      dispatch({
        type: SearchDialogTypes.SetSearchByValue,
        payload: { searchByValue: event.target.value as SearchByValue },
      });
  };
  const handleSortOrder = (event: SelectChangeEvent): void => {
    event.target.value &&
      dispatch({
        type: SearchDialogTypes.SetSortByOrder,
        payload: { sortByOrder: event.target.value as SortOrder },
      });
  };

  const handleSortEntity = (event: SelectChangeEvent): void => {
    if (!!event.target.value) {
      dispatch({
        type: SearchDialogTypes.SetSortByEntity,
        payload: { sortByEntity: event.target.value as EntityTypes },
      });
      // reset searchby and sortBy
      if ((event.target.value as EntityTypes) === EntityTypes.BookEntity) {
        dispatch({
          type: SearchDialogTypes.SetSearchByValue,
          payload: { searchByValue: SearchByValue.title },
        });
        dispatch({
          type: SearchDialogTypes.SetSortByValue,
          payload: { sortByValue: SearchSortValue.wishlistCount },
        });
      } else if (
        (event.target.value as EntityTypes) === EntityTypes.UserEntity
      ) {
        dispatch({
          type: SearchDialogTypes.SetSearchByValue,
          payload: { searchByValue: SearchByValue.username },
        });
        dispatch({
          type: SearchDialogTypes.SetSortByValue,
          payload: { sortByValue: SearchSortValue.username },
        });
      }
    }
  };

  // pagination
  const handleRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (event.target.value) {
      dispatch({
        type: SearchDialogTypes.SetRowsPerPage,
        payload: { rowsPerPage: Number.parseInt(event.target.value, 10) },
      });
      dispatch({
        type: SearchDialogTypes.SetPageNumber,
        payload: { pageNumber: 1 },
      });
    }
  };

  const handlePageNumber = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ): void => {
    if (val) {
      dispatch({
        type: SearchDialogTypes.SetPageNumber,
        payload: { pageNumber: val },
      });
    }
  };

  return {
    fullScreen,
    totalPages: searchListData?.data.totalPages ?? -1,
    ...state,
    handleSortEntity,
    handleSearch,
    handleClickOpenDialog,
    handleCloseDialog,
    handleSortValue,
    handleSortOrder,
    // pagination
    handleRowsPerPage,
    handlePageNumber,
    handleSearchByValue,
  };
};

// const [openDialog, setOpenDialog] = useState<boolean>(true);
// const [searchText, setSearchText] = useState<string>("");

// const [searchResultList, setSearchResultList] = useState<SearchItem[]>([]);
// const [sortByValue, setSortByValue] = useState<SearchSortValue>(
//   SearchSortValue.wishlistCount
// );
// const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);
// const [sortByEntity, setSortByEntity] = useState<EntityTypes>(
//   EntityTypes.BookAndUser
// );
// const [sortByPresence, setSortByPresence] = useState<SortPresence>(
//   SortPresence.both
// );
