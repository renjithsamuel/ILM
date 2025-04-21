import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetHighDemandBooksResponse = AxiosResponse<Book[]>;
export type GetHighDemandBooksAPIResponse = { highDemandBooks: IBook[] };

export const getHighDemandBooksAPI =
  async (): Promise<GetHighDemandBooksResponse> => {
    const response = await PrivateAxios.get<GetHighDemandBooksAPIResponse>(
      `/dashboards/highdemand`,
    );

    let books: Book[] = response.data.highDemandBooks.map(
      (item) => new Book(item),
    );

    return {
      ...response,
      data: books,
    };
  };

export const useGetHighDemandBooksAPI = (
  enabled = true,
): UseQueryResult<GetHighDemandBooksResponse, AxiosError> => {
  return useQuery<GetHighDemandBooksResponse, AxiosError>(
    [QueryKeys.GET_HIGH_DEMAND],
    () => getHighDemandBooksAPI(),
    {
      enabled,
    },
  );
};
