import { Reducer } from "react";
import { RSearchDialog } from "./searchDialog";
import { SearchDialogTypes } from "./searchDialog.types";
import {
  EntityTypes,
  SearchSortValue,
  SortOrder,
  SortPresence,
} from "@/constants/GlobalConstants";

export const initialSearchDialogValues: RSearchDialog.ISearchDialog = {
  searchText: "",
  openDialog: true,
  searchResultList: [],
  sortByValue: SearchSortValue.wishlistCount,
  sortByOrder: SortOrder.asc,
  sortByEntity: EntityTypes.BookAndUser,
  sortByPresence: SortPresence.both,
};

export const searchDialogReducer: Reducer<
  RSearchDialog.ISearchDialog,
  RSearchDialog.SearchDialogActions
> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SearchDialogTypes.SetSearchText:
      return {
        ...state,
        searchText: payload.searchText,
      };

    case SearchDialogTypes.SetOpenDialog:
      return {
        ...state,
        openDialog: payload.openDialog,
      };

    case SearchDialogTypes.SetSearchResultList:
      return {
        ...state,
        searchResultList: payload.searchResults,
      };

    case SearchDialogTypes.SetSortByValue:
      return {
        ...state,
        sortByValue: payload.sortByValue,
      };

    case SearchDialogTypes.SetSortByOrder:
      return {
        ...state,
        sortByOrder: payload.sortByOrder,
      };

    case SearchDialogTypes.SetSortByEntity:
      return {
        ...state,
        sortByEntity: payload.sortByEntity,
      };

    case SearchDialogTypes.SetSortByPresence:
      return {
        ...state,
        sortByPresence: payload.sortByPresence,
      };

    default:
      return state;
  }
};
