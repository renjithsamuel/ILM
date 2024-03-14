import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import {
  CheckoutTicket,
  ICheckoutTicket,
} from "@/entity/CheckoutTicket/CheckoutTicket";

export type GetCheckoutByIDRequest = {
  checkoutID: string;
};

export type GetCheckoutByIDResponse = AxiosResponse<CheckoutTicket>;
export type GetCheckoutByIDAPIResponse = { checkoutTicket: ICheckoutTicket };

export const getCheckoutByIDAPI = async ({
  checkoutID,
}: GetCheckoutByIDRequest): Promise<GetCheckoutByIDResponse> => {
  const response = await PrivateAxios.get<GetCheckoutByIDAPIResponse>(
    `/checkouts/${checkoutID}`
  );

  return {
    ...response,
    data: new CheckoutTicket(response.data.checkoutTicket),
  };
};

export const useGetCheckoutByIDAPI = (
  checkoutID: string,
  enabled = true
): UseQueryResult<GetCheckoutByIDResponse, AxiosError> => {
  return useQuery<GetCheckoutByIDResponse, AxiosError>(
    [QueryKeys.GET_CHECKOUT],
    () => getCheckoutByIDAPI({ checkoutID }),
    {
      enabled,
    }
  );
};
