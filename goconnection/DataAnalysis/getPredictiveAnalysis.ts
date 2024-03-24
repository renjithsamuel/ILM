import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetPredictiveAnalysisRequest = {
  page: number;
  limit: number;
};

export type GetPredictiveAnalysisResponse = AxiosResponse<{
  totalPages: number;
  books: Book[];
}>;
export type GetPredictiveAnalysisAPIResponse = {
  totalPages: number;
  books: IBook[];
};

export const getPredictiveAnalysisAPI = async ({
  page,
  limit,
}: GetPredictiveAnalysisRequest): Promise<GetPredictiveAnalysisResponse> => {
  const response = await PrivateAxios.get<GetPredictiveAnalysisAPIResponse>(
    `/dataanalysis/approximatedemand?page=${page}&limit=${limit}`
  );

  let books: Book[] = response.data.books.map((item) => new Book(item));

  return {
    ...response,
    data: { totalPages: response.data.totalPages, books },
  };
};

export const useGetPredictiveAnalysisAPI = (
  request: GetPredictiveAnalysisRequest,
  enabled = true
): UseQueryResult<GetPredictiveAnalysisResponse, AxiosError> => {
  return useQuery<GetPredictiveAnalysisResponse, AxiosError>(
    [QueryKeys.GET_APPROXIMATE_DEMAND, { ...request }],
    () => getPredictiveAnalysisAPI(request),
    {
      enabled,
    }
  );
};
