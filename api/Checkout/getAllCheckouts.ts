import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import {
  CheckoutTicket,
  ICheckoutTicket,
} from "@/entity/CheckoutTicket/CheckoutTicket";

export type GetAllCheckoutsResponse = AxiosResponse<CheckoutTicket[]>;
export type GetAllCheckoutsAPIResponse = { checkoutTickets: ICheckoutTicket[] };

export const getAllCheckoutsAPI =
  async (): Promise<GetAllCheckoutsResponse> => {
    const response =
      await PrivateAxios.get<GetAllCheckoutsAPIResponse>(`/allcheckouts`);

    let checkoutTickets: CheckoutTicket[] = response.data.checkoutTickets.map(
      (ticket) => new CheckoutTicket(ticket)
    );

    return {
      ...response,
      data: checkoutTickets,
    };
  };

export const useGetAllCheckoutsAPI = (
  enabled = true
): UseQueryResult<GetAllCheckoutsResponse, AxiosError> => {
  return useQuery<GetAllCheckoutsResponse, AxiosError>(
    [QueryKeys.GET_ALL_CHECKOUTS],
    () => getAllCheckoutsAPI(),
    {
      enabled,
    }
  );
};
