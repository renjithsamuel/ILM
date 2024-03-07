import {
  EntityTypes,
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

interface searchDialogHookProps {
  setIsSearchClicked: (value: SetStateAction<boolean>) => void;
}

interface searchDialogHook {
  fullScreen: boolean;
  openDialog: boolean;
  sortByOrder: SortOrder;
  sortByValue: SearchSortValue;
  searchResultList: SearchItem[];
  sortByEntity: EntityTypes;
  sortByPresence: SortPresence;
  handleSortPresence: () => void;
  handleClickOpenDialog: () => void;
  handleCloseDialog: () => void;
  handleSearch: (val: string) => void;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
  handleSortEntity: (event: SelectChangeEvent) => void;
}

export const useSearchDialog = ({
  setIsSearchClicked,
}: searchDialogHookProps): searchDialogHook => {
  // for search dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [state, dispatch] = useReducer(
    searchDialogReducer,
    initialSearchDialogValues,
  );

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
    if (value && value != "" && value.length > 0) {
      dispatch({
        type: SearchDialogTypes.SetSearchText,
        payload: { searchText: value },
      });
    }
  }, globalConstants.debounceDelay);

  // send sort value and sort order to backend to get the sort values
  // get all books
  // give full freedom to sort from
  useEffect(() => {
    dispatch({
      type: SearchDialogTypes.SetSearchResultList,
      payload: { searchResults: mockSearchItems },
    });
  }, [state.sortByOrder, state.sortByValue, state.sortByEntity]);

  useEffect(() => {
    if (state.sortByEntity !== EntityTypes.BookEntity) {
      dispatch({
        type: SearchDialogTypes.SetSortByPresence,
        payload: { sortByPresence: SortPresence.both },
      });
    }
  }, [state.sortByEntity]);

  // sorting
  const handleSortValue = (event: SelectChangeEvent): void => {
    event.target.value &&
      dispatch({
        type: SearchDialogTypes.SetSortByValue,
        payload: { sortByValue: event.target.value as SearchSortValue },
      });
  };
  const handleSortOrder = (event: SelectChangeEvent): void => {
    event.target.value &&
      dispatch({
        type: SearchDialogTypes.SetSortByOrder,
        payload: { sortByOrder: event.target.value as SortOrder },
      });
  };
  const handleSortPresence = (): void => {
    const tempSortPresence =
      state.sortByPresence !== SortPresence.inLibrary
        ? SortPresence.inLibrary
        : SortPresence.both;

    dispatch({
      type: SearchDialogTypes.SetSortByPresence,
      payload: { sortByPresence: tempSortPresence },
    });
  };

  const handleSortEntity = (event: SelectChangeEvent): void => {
    event.target.value &&
      dispatch({
        type: SearchDialogTypes.SetSortByEntity,
        payload: { sortByEntity: event.target.value as EntityTypes },
      });
  };

  return {
    fullScreen,
    ...state,
    handleSortPresence,
    handleSortEntity,
    handleSearch,
    handleClickOpenDialog,
    handleCloseDialog,
    handleSortValue,
    handleSortOrder,
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
