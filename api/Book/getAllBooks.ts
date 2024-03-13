import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetAllBooksResponse = AxiosResponse<Book[]>;
export type GetAllBooksAPIResponse = { books: IBook[] };

export const getAllBooksAPI = async (): Promise<GetAllBooksResponse> => {
  const response = await PrivateAxios.get<GetAllBooksAPIResponse>(`/allbooks`);

  let books: Book[] = response.data.books.map((user) => new Book(user));

  return {
    ...response,
    data: books,
  };
};

export const useGetAllBooksAPI = (
  enabled = true
): UseQueryResult<GetAllBooksResponse, AxiosError> => {
  return useQuery<GetAllBooksResponse, AxiosError>(
    [QueryKeys.GET_ALL_BOOKS],
    () => getAllBooksAPI(),
    {
      enabled,
    }
  );
};
