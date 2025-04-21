import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import { IReview, Review } from "@/entity/Review/Review";
import { IUser, User } from "@/entity/User/User";
import { Book, IBook } from "@/entity/Book/Book";
import { EntityTypes } from "@/constants/GlobalConstants";

export type SearchDialogRequest = {
  page: number;
  limit: number;
  sortBy: string;
  orderBy: string;
  searchText: string;
  searchBy: string;
  type: string;
};
export type SearchDialogResponse = AxiosResponse<{
  totalPages: number;
  books: Book[];
  users: User[];
}>;

export type SearchDialogAPIResponse = {
  totalPages: number;
  books: IBook[];
  users: IUser[];
};

export const searchDialogAPI = async ({
  page,
  limit,
  sortBy,
  orderBy,
  searchText,
  searchBy,
  type,
}: SearchDialogRequest): Promise<SearchDialogResponse> => {
  const response = await PrivateAxios.get<SearchDialogAPIResponse>(
    `/search?sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&limit=${limit}&searchText=${searchText}&searchBy=${searchBy}&type=${type}`,
  );

  let books: Book[] = [];
  let users: User[] = [];

  switch (type) {
    case EntityTypes.UserEntity:
      users = response.data.users.map((user) => new User(user));
      break;
    case EntityTypes.BookEntity:
      books = response.data.books.map((book) => new Book(book));

    default:
      break;
  }

  return {
    ...response,
    data: { totalPages: response.data.totalPages, users: users, books: books },
  };
};

export const useSearchDialogAPI = (
  request: SearchDialogRequest,
  enabled = true,
): UseQueryResult<SearchDialogResponse, AxiosError> => {
  return useQuery<SearchDialogResponse, AxiosError>(
    [QueryKeys.SEARCH_DIALOG, { ...request }],
    () => searchDialogAPI(request),
    {
      enabled: enabled,
    },
  );
};
