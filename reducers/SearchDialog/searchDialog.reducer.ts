import { Reducer } from "react";
import { RSearchDialog } from "./searchDialog";
import { SearchDialogTypes } from "./searchDialog.types";
import {
  EntityTypes,
  SearchByValue,
  SearchSortValue,
  SortOrder,
  SortPresence,
} from "@/constants/GlobalConstants";

export const initialSearchDialogValues: RSearchDialog.ISearchDialog = {
  searchText: "",
  openDialog: true,
  searchResultList: [],
  sortByValue: SearchSortValue.wishlistCount,
  searchByValue: SearchByValue.title,
  sortByOrder: SortOrder.asc,
  sortByEntity: EntityTypes.BookEntity,
  pageNumber: 1,
  rowsPerPage: 10,
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

    case SearchDialogTypes.SetSearchByValue:
      return {
        ...state,
        searchByValue: payload.searchByValue,
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

    case SearchDialogTypes.SetPageNumber:
      return {
        ...state,
        pageNumber: payload.pageNumber,
      };

    case SearchDialogTypes.SetRowsPerPage:
      return {
        ...state,
        rowsPerPage: payload.rowsPerPage,
      };

    default:
      return state;
  }
};
