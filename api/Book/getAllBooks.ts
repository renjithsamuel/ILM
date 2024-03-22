import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetAllBooksResponseRequest = {
  page: number;
  limit: number;
  orderBy: string;
  sortBy: string;
};

export type GetAllBooksResponse = AxiosResponse<{
  totalPages: number;
  books: Book[];
}>;
export type GetAllBooksAPIResponse = { totalPages: number; books: IBook[] };

export const getAllBooksAPI = async ({
  page,
  limit,
  orderBy,
  sortBy,
}: GetAllBooksResponseRequest): Promise<GetAllBooksResponse> => {
  const response = await PrivateAxios.get<GetAllBooksAPIResponse>(
    `/allbooks?sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&limit=${limit}`
  );

  let books: Book[] = response.data.books.map((user) => new Book(user));

  return {
    ...response,
    data: { totalPages: response.data.totalPages, books: books },
  };
};

export const useGetAllBooksAPI = (
  request: GetAllBooksResponseRequest,
  enabled = true
): UseQueryResult<GetAllBooksResponse, AxiosError> => {
  return useQuery<GetAllBooksResponse, AxiosError>(
    [QueryKeys.GET_ALL_BOOKS, {...request}],
    () => getAllBooksAPI(request),
    {
      enabled,
    }
  );
};
