import { EntityTypes } from "@/constants/GlobalConstants";

export interface ISearchItem {
  entityID: string;
  entityType: EntityTypes;
  views: number;
  bookname?: string;
  username?: string;
  bookDescription?: string;
  emailID?: string;
}

export class SearchItem implements ISearchItem {
  entityID: string;
  entityType: EntityTypes;
  views: number;
  bookname?: string;
  username?: string;
  bookDescription?: string;
  emailID?: string;

  constructor(searchItem: ISearchItem) {
    this.entityID = searchItem.entityID;
    this.entityType = searchItem.entityType;
    this.views = searchItem.views;
    this.bookname = searchItem.bookname;
    this.username = searchItem.username;
    this.bookDescription = searchItem.bookDescription;
    this.emailID = searchItem.emailID;
  }
}
