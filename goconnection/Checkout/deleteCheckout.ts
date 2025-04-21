import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios } from "../index";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";

export type DeleteCheckoutRequest = {
  checkoutID: string;
};

export type DeleteCheckoutResponse = {
  message: string;
};

export const deleteCheckoutAPI = async ({
  checkoutID,
}: DeleteCheckoutRequest): Promise<AxiosResponse<DeleteCheckoutResponse>> => {
  return PrivateAxios.delete(`/checkouts/${checkoutID}`);
};

export const useDeleteCheckoutAPI = (): UseMutationResult<
  AxiosResponse<DeleteCheckoutResponse>,
  AxiosError<DeleteCheckoutResponse>,
  DeleteCheckoutRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<DeleteCheckoutResponse>,
    AxiosError<DeleteCheckoutResponse>,
    DeleteCheckoutRequest
  >(deleteCheckoutAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.GET_ALL_CHECKOUTS);
      queryClient.invalidateQueries(QueryKeys.GET_CHECKOUT_BY_ID);
      queryClient.invalidateQueries(QueryKeys.GET_CHECKOUT_WITH_USERID);
    },
  });
};
