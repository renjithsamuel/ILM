import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetAllBooksFromBookDetailsRequest = {
  bookDetailsFrom: string;
  userID: string;
};
export type GetAllBooksFromBookDetailsResponse = AxiosResponse<Book[]>;
export type GetAllBooksFromBookDetailsAPIResponse = { books: IBook[] };

export const getAllBooksFromBookDetailsAPI = async (
  getAllBooksFromBookDetailsRequest: GetAllBooksFromBookDetailsRequest,
): Promise<GetAllBooksFromBookDetailsResponse> => {
  const response =
    await PrivateAxios.get<GetAllBooksFromBookDetailsAPIResponse>(
      `/allbooks/${getAllBooksFromBookDetailsRequest.userID}/${getAllBooksFromBookDetailsRequest.bookDetailsFrom}`,
    );

  let books: Book[] = response.data.books.map((user) => new Book(user));

  return {
    ...response,
    data: books,
  };
};

export const useGetAllBooksFromBookDetailsAPI = (
  request: GetAllBooksFromBookDetailsRequest,
  enabled = true,
): UseQueryResult<GetAllBooksFromBookDetailsResponse, AxiosError> => {
  return useQuery<GetAllBooksFromBookDetailsResponse, AxiosError>(
    [QueryKeys.GET_ALL_BOOKS_FROM_BOOK_DETAILS, { ...request }],
    () => getAllBooksFromBookDetailsAPI(request),
    {
      enabled,
    },
  );
};
