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

  constructor(user: ISearchItem) {
    this.entityID = user.entityID;
    this.entityType = user.entityType;
    this.views = user.views;
    this.bookname = user.bookname;
    this.username = user.username;
    this.bookDescription = user.bookDescription;
    this.emailID = user.emailID;
  }
}
