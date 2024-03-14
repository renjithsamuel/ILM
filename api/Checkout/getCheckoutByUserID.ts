import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import {
  CheckoutTicket,
  ICheckoutTicket,
} from "@/entity/CheckoutTicket/CheckoutTicket";

export type GetCheckoutByUserIDRequest = {
  bookID: string | undefined;
  userID: string;
};

export type GetCheckoutByUserIDResponse = AxiosResponse<CheckoutTicket>;
export type GetCheckoutByUserIDAPIResponse = {
  checkoutTicket: ICheckoutTicket;
};

export const getCheckoutByUserIDAPI = async ({
  bookID,
  userID,
}: GetCheckoutByUserIDRequest): Promise<GetCheckoutByUserIDResponse> => {
  const response = await PrivateAxios.get<GetCheckoutByUserIDAPIResponse>(
    `/checkouts/${bookID}/${userID}`
  );

  return {
    ...response,
    data: new CheckoutTicket(response.data.checkoutTicket),
  };
};

export const useGetCheckoutByUserIDAPI = (
  bookID: string | undefined,
  userID: string,
  enabled = true
): UseQueryResult<GetCheckoutByUserIDResponse, AxiosError> => {
  return useQuery<GetCheckoutByUserIDResponse, AxiosError>(
    [QueryKeys.GET_CHECKOUT],
    () => getCheckoutByUserIDAPI({ bookID, userID }),
    {
      enabled: enabled && !!bookID,
    }
  );
};
