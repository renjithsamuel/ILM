import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
// const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export type GetNewBooksGoogleRequest = {
  page: number;
  limit: number;
  orderBy: string;
};

export type GetNewBooksGoogleResponse = AxiosResponse<{
  totalPages: number;
  books: Book[];
}>;
export type GetNewBooksGoogleAPIResponse = {
  totalPages: number;
  books: IBook[];
};

export const getGoogleAllBooksAPI = async ({
  page,
  limit,
  orderBy,
}: GetNewBooksGoogleRequest): Promise<GetNewBooksGoogleResponse> => {
  const response = await PrivateAxios.get<GetNewBooksGoogleAPIResponse>(
    `/allbooks/google?orderBy=${orderBy}&page=${page}&limit=${limit}`
  );

  let books: Book[] = response.data.books.map((book) => new Book(book));
  return {
    ...response,
    data: { totalPages: response.data.totalPages, books: books },
  };
};

export const useGetNewBooksGoogleAPI = (
  request: GetNewBooksGoogleRequest,
  enabled = true
): UseQueryResult<GetNewBooksGoogleResponse, AxiosError> => {
  return useQuery<GetNewBooksGoogleResponse, AxiosError>(
    [QueryKeys.GET_ALL_NEW_BOOKS_GOOGLE],
    () => getGoogleAllBooksAPI(request),
    {
      enabled,
    }
  );
};
