import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetRecommendedBooksRequest = {
  page: number;
  limit: number;
};
export type GetRecommendedBooksResponse = AxiosResponse<{
  totalPages: number;
  books: Book[];
}>;
export type GetRecommendedBooksAPIResponse = {
  totalPages: number;
  books: IBook[];
};

export const getRecommendedBooksAPI = async ({
  page,
  limit,
}: GetRecommendedBooksRequest): Promise<GetRecommendedBooksResponse> => {
  const response = await PrivateAxios.get<GetRecommendedBooksAPIResponse>(
    `/dataanalysis/recommendedbooks?page=${page}&limit=${limit}`,
  );

  let books: Book[] = response.data.books.map((item) => new Book(item));

  return {
    ...response,
    data: { totalPages: response.data.totalPages, books },
  };
};

export const useGetRecommendedBooksAPI = (
  request: GetRecommendedBooksRequest,
  enabled = true,
): UseQueryResult<GetRecommendedBooksResponse, AxiosError> => {
  return useQuery<GetRecommendedBooksResponse, AxiosError>(
    [QueryKeys.GET_RECOMMENDED_BOOKS, { ...request }],
    () => getRecommendedBooksAPI(request),
    {
      enabled,
    },
  );
};
