import {
  EntityTypes,
  SearchSortValue,
  SortOrder,
  globalConstants,
} from "@/constants/GlobalConstants";
import { SearchItem } from "@/entity/SearchItem/SearchItem";
import { debounce } from "@/utils/debounce";
import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { SetStateAction, useEffect, useState } from "react";
import { mockSearchItems } from "@/entity/SearchItem/SearchItem.mock";

interface searchDialogHookProps {
  setIsSearchClicked: (value: SetStateAction<boolean>) => void;
}

interface searchDialogHook {
  fullScreen: boolean;
  openDialog: boolean;
  sortByOrder: SortOrder;
  sortByValue: SearchSortValue;
  searchResultList: SearchItem[];
  sortByEntity: EntityTypes | undefined;
  handleClickOpenDialog: () => void;
  handleCloseDialog: () => void;
  handleSearch: (val: string) => void;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
  handleSortEntity: (event: SelectChangeEvent) => void
}

export const useSearchDialog = ({
  setIsSearchClicked,
}: searchDialogHookProps): searchDialogHook => {
  // for search dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  const [searchResultList, setSearchResultList] = useState<SearchItem[]>([]);
  const [sortByValue, setSortByValue] = useState<SearchSortValue>(
    SearchSortValue.wishlistCount
  );
  const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);
  const [sortByEntity, setSortByEntity] = useState<
    EntityTypes | undefined
  >();

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsSearchClicked(false);
  };

  const handleSearch = debounce((value: string) => {
    if (value && value != "" && value.length > 0) {
      setSearchText(value);
    }
  }, globalConstants.debounceDelay);

  // send sort value and sort order to backend to get the sort values
  // get all books
  // give full freedom to sort from
  useEffect(() => {
    setSearchResultList(mockSearchItems);
  }, [sortByOrder, sortByValue]);

  // sorting
  const handleSortValue = (event: SelectChangeEvent): void => {
    event.target.value && setSortByValue(event.target.value as SearchSortValue);
  };
  const handleSortOrder = (event: SelectChangeEvent): void => {
    (event.target.value === SortOrder.asc ||
      event.target.value === SortOrder.desc) &&
      setSortByOrder(event.target.value as SortOrder);
  };

  const handleSortEntity = (event: SelectChangeEvent): void => {
    (event.target.value === EntityTypes.UserEntity ||
      event.target.value === EntityTypes.BookEntity) &&
      setSortByEntity(event.target.value as EntityTypes);
  };

  return {
    fullScreen,
    openDialog,
    handleSearch,
    sortByOrder,
    sortByValue,
    searchResultList,
    sortByEntity,
    handleSortEntity,
    handleClickOpenDialog,
    handleCloseDialog,
    handleSortValue,
    handleSortOrder,
  };
};
