import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios, PublicAxios } from "../index";
import { UserLogin } from "@/types/UserLogin";
import { Book } from "@/entity/Book/Book";

export type CreateCheckoutRequest = {
  bookID: string;
  userID: string;
  numberOfDays: number;
};

export type CreateCheckoutResponse = {
  message: string;
};

export const createCheckoutAPI = async (
  request: CreateCheckoutRequest,
): Promise<AxiosResponse<CreateCheckoutResponse>> => {
  return PrivateAxios.post(`/checkouts`, request);
};

export const useCreateCheckoutAPI = (): UseMutationResult<
  AxiosResponse<CreateCheckoutResponse>,
  AxiosError<CreateCheckoutResponse>,
  CreateCheckoutRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<CreateCheckoutResponse>,
    AxiosError<CreateCheckoutResponse>,
    CreateCheckoutRequest
  >(createCheckoutAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.GET_ALL_CHECKOUTS);
      queryClient.invalidateQueries(QueryKeys.GET_CHECKOUT_BY_ID);
      queryClient.invalidateQueries(QueryKeys.GET_CHECKOUT_WITH_USERID);
    },
  });
};
