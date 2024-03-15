import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetBookResponse = AxiosResponse<Book>;
export type GetBookAPIResponse = { book: IBook };

export const getBookAPI = async (ISBN: string): Promise<GetBookResponse> => {
  const response = await PrivateAxios.get<GetBookAPIResponse>(`/books/${ISBN}`);

  const user = new Book(response?.data.book);
  return {
    ...response,
    data: user,
  };
};

export const useGetBookAPI = (
  ISBN: string,
  enabled = true
): UseQueryResult<GetBookResponse, AxiosError> => {
  return useQuery<GetBookResponse, AxiosError>(
    [QueryKeys.GET_BOOK, ISBN],
    () => getBookAPI(ISBN),
    {
      enabled,
    }
  );
};
