import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import { IReview, Review } from "@/entity/Review/Review";

export type GetAllReviewsByBookIDRequest = {
  bookID: string | undefined;
  page: number;
  limit: number;
  sortBy: string;
};
export type GetAllReviewsByBookIDResponse = AxiosResponse<{
  totalPages: number;
  reviews: Review[];
}>;

export type GetAllReviewsByBookIDAPIResponse = {
  totalPages: number;
  reviews: IReview[];
};

export const getAllReviewsByBookIDAPI = async ({
  bookID,
  page,
  limit,
  sortBy,
}: GetAllReviewsByBookIDRequest): Promise<GetAllReviewsByBookIDResponse> => {
  const response = await PrivateAxios.get<GetAllReviewsByBookIDAPIResponse>(
    `/allreviews/${bookID}?sortBy=${sortBy}&page=${page}&limit=${limit}`
  );

  let reviews: Review[] = response.data.reviews.map(
    (ticket) => new Review(ticket)
  );

  return {
    ...response,
    data: { totalPages: response.data.totalPages, reviews },
  };
};

export const useGetAllReviewsByBookIDAPI = (
  request: GetAllReviewsByBookIDRequest,
  enabled = true
): UseQueryResult<GetAllReviewsByBookIDResponse, AxiosError> => {
  return useQuery<GetAllReviewsByBookIDResponse, AxiosError>(
    [QueryKeys.GET_REVIEWS, { ...request }],
    () => getAllReviewsByBookIDAPI(request),
    {
      enabled: enabled && !!request.bookID,
    }
  );
};
