import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import {
  CheckoutTicket,
  ICheckoutTicket,
} from "@/entity/CheckoutTicket/CheckoutTicket";

export type GetAllCheckoutsRequest = {
  page: number;
  limit: number;
  orderBy: string;
  sortBy: string;
};
export type GetAllCheckoutsResponse = AxiosResponse<{
  totalPages: number;
  checkoutTickets: CheckoutTicket[];
}>;
export type GetAllCheckoutsAPIResponse = {
  totalPages: number;
  checkoutTickets: ICheckoutTicket[];
};

export const getAllCheckoutsAPI = async ({
  page,
  limit,
  orderBy,
  sortBy,
}: GetAllCheckoutsRequest): Promise<GetAllCheckoutsResponse> => {
  const response = await PrivateAxios.get<GetAllCheckoutsAPIResponse>(
    `/allcheckouts?sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&limit=${limit}`,
  );

  let checkoutTickets: CheckoutTicket[] = response.data.checkoutTickets.map(
    (ticket) => new CheckoutTicket(ticket),
  );

  return {
    ...response,
    data: { totalPages: response.data.totalPages, checkoutTickets },
  };
};

export const useGetAllCheckoutsAPI = (
  request: GetAllCheckoutsRequest,
  enabled = true,
): UseQueryResult<GetAllCheckoutsResponse, AxiosError> => {
  return useQuery<GetAllCheckoutsResponse, AxiosError>(
    [QueryKeys.GET_ALL_CHECKOUTS, { ...request }],
    () => getAllCheckoutsAPI(request),
    {
      enabled,
    },
  );
};
