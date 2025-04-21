import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios } from "../index";
import { CreateReview } from "@/types/Review";

export type CreateReviewRequest = {
  review: CreateReview;
};

export type CreateReviewResponse = {
  message: string;
};

export const createReviewAPI = async ({
  review,
}: CreateReviewRequest): Promise<AxiosResponse<CreateReviewResponse>> => {
  return PrivateAxios.post(`/reviews`, review);
};

export const useCreateReviewAPI = (): UseMutationResult<
  AxiosResponse<CreateReviewResponse>,
  AxiosError<CreateReviewResponse>,
  CreateReviewRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<CreateReviewResponse>,
    AxiosError<CreateReviewResponse>,
    CreateReviewRequest
  >(createReviewAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.GET_REVIEW);
      queryClient.invalidateQueries(QueryKeys.GET_REVIEWS);
    },
  });
};
