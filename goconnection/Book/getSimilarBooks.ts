import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetSimilarBooksRequest = {
  isbn: string;
};
export type GetSimilarBooksResponse = AxiosResponse<Book[]>;
export type GetSimilarBooksAPIResponse = { books: IBook[] };

export const getSimilarBooksAPI = async ({
  isbn,
}: GetSimilarBooksRequest): Promise<GetSimilarBooksResponse> => {
  const response = await PrivateAxios.get<GetSimilarBooksAPIResponse>(
    `/similarbooks/${isbn}`
  );

  let books: Book[] = response.data.books.map((item) => new Book(item));

  return {
    ...response,
    data: books,
  };
};

export const useGetSimilarBooksAPI = (
  request: GetSimilarBooksRequest,
  enabled = true
): UseQueryResult<GetSimilarBooksResponse, AxiosError> => {
  return useQuery<GetSimilarBooksResponse, AxiosError>(
    [QueryKeys.GET_SIMILAR_BOOKS, request.isbn],
    () => getSimilarBooksAPI(request),
    {
      enabled,
    }
  );
};
