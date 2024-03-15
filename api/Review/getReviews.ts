import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import { IReview, Review } from "@/entity/Review/Review";

export type GetAllReviewsByBookIDResponse = AxiosResponse<Review[]>;
export type GetAllReviewsByBookIDAPIResponse = {
  reviews: IReview[];
};

export const getAllReviewsByBookIDAPI = async (
  bookID: string | undefined
): Promise<GetAllReviewsByBookIDResponse> => {
  const response = await PrivateAxios.get<GetAllReviewsByBookIDAPIResponse>(
    `/allreviews/${bookID}`
  );

  let reviews: Review[] = response.data.reviews.map(
    (ticket) => new Review(ticket)
  );

  return {
    ...response,
    data: reviews,
  };
};

export const useGetAllReviewsByBookIDAPI = (
  bookID: string | undefined,
  enabled = true
): UseQueryResult<GetAllReviewsByBookIDResponse, AxiosError> => {
  return useQuery<GetAllReviewsByBookIDResponse, AxiosError>(
    [QueryKeys.GET_REVIEWS, bookID],
    () => getAllReviewsByBookIDAPI(bookID),
    {
      enabled: enabled && !!bookID,
    }
  );
};
