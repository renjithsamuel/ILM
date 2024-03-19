import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetAllBooksFromSpecificRequest = {
  booksList: string[] | undefined;
};
export type GetAllBooksFromSpecificResponse = AxiosResponse<Book[]>;
export type GetAllBooksFromSpecificAPIResponse = { books: IBook[] };

export const getAllBooksFromSpecificAPI = async ({
  booksList,
}: GetAllBooksFromSpecificRequest): Promise<GetAllBooksFromSpecificResponse> => {
  const response = await PrivateAxios.post<GetAllBooksFromSpecificAPIResponse>(
    `/allbooks/specific`,
    booksList
  );
  let books: Book[] = response.data.books.map((user) => new Book(user));

  return {
    ...response,
    data: books,
  };
};

export const useGetAllBooksFromSpecificFromSpecificListAPI = (
  request: GetAllBooksFromSpecificRequest,
  enabled = true
): UseQueryResult<GetAllBooksFromSpecificResponse, AxiosError> => {
  return useQuery<GetAllBooksFromSpecificResponse, AxiosError>(
    [QueryKeys.GET_ALL_BOOKS_FROM_SPECIFIC_LIST],
    () => getAllBooksFromSpecificAPI(request),
    {
      enabled: enabled && !!request.booksList,
    }
  );
};
