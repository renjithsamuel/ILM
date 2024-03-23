import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios } from "../index";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";

export type UpdateCheckoutRequest = {
  checkOutTicket: CheckoutTicket;
};

export type UpdateCheckoutResponse = {
  message: string;
};

export const updateCheckoutAPI = async ({
  checkOutTicket,
}: UpdateCheckoutRequest): Promise<AxiosResponse<UpdateCheckoutResponse>> => {
  return PrivateAxios.put(`/checkouts`, checkOutTicket);
};

export const useUpdateCheckoutAPI = (): UseMutationResult<
  AxiosResponse<UpdateCheckoutResponse>,
  AxiosError<UpdateCheckoutResponse>,
  UpdateCheckoutRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<UpdateCheckoutResponse>,
    AxiosError<UpdateCheckoutResponse>,
    UpdateCheckoutRequest
  >(updateCheckoutAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.GET_ALL_CHECKOUTS);
      queryClient.invalidateQueries(QueryKeys.GET_CHECKOUT_BY_ID);
      queryClient.invalidateQueries(QueryKeys.GET_CHECKOUT_WITH_USERID);
    },
  });
};
