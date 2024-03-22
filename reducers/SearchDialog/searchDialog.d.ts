import { SearchItem } from "@/entity/SearchItem/SearchItem";
import { SearchDialogTypes } from "./searchDialog.types";
import {
  EntityTypes,
  SearchByValue,
  SearchSortValue,
  SortOrder,
  SortPresence,
} from "@/constants/GlobalConstants";

type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

declare namespace RSearchDialog {
  interface ISearchDialog {
    searchText: string;
    openDialog: boolean;
    searchResultList: SearchItem[];
    searchByValue: SearchByValue;
    sortByValue: SearchSortValue;
    sortByOrder: SortOrder;
    sortByEntity: EntityTypes;
    pageNumber: number;
    rowsPerPage: number;
  }

  type SearchDialogPayload = {
    [SearchDialogTypes.SetSearchText]: { searchText: string };
    [SearchDialogTypes.SetOpenDialog]: { openDialog: boolean };
    [SearchDialogTypes.SetSearchResultList]: { searchResults: SearchItem[] };
    [SearchDialogTypes.SetSearchByValue]: { searchByValue: SearchByValue };
    [SearchDialogTypes.SetSortByValue]: { sortByValue: SearchSortValue };
    [SearchDialogTypes.SetSortByOrder]: { sortByOrder: SortOrder };
    [SearchDialogTypes.SetSortByEntity]: { sortByEntity: EntityTypes };
    [SearchDialogTypes.SetPageNumber]: { pageNumber: number };
    [SearchDialogTypes.SetRowsPerPage]: { rowsPerPage: number };
  };

  type SearchDialogActions =
    ActionMap<SearchDialogPayload>[keyof ActionMap<SearchDialogPayload>];
}
