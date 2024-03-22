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

export type GetCheckoutByUserIDResponse = AxiosResponse<CheckoutTicket[]>;
export type GetCheckoutByUserIDAPIResponse = {
  checkoutTickets: ICheckoutTicket[];
};

export const getCheckoutByUserIDAPI = async ({
  bookID,
  userID,
}: GetCheckoutByUserIDRequest): Promise<GetCheckoutByUserIDResponse> => {
  const response = await PrivateAxios.get<GetCheckoutByUserIDAPIResponse>(
    `/allcheckouts/${bookID}/${userID}`
  );

  const checkoutTickets = response.data.checkoutTickets.map(
    (item) => new CheckoutTicket(item)
  );

  return {
    ...response,
    data: checkoutTickets,
  };
};

export const useGetCheckoutByUserIDAPI = (
  bookID: string | undefined,
  userID: string,
  enabled = true
): UseQueryResult<GetCheckoutByUserIDResponse, AxiosError> => {
  return useQuery<GetCheckoutByUserIDResponse, AxiosError>(
    [QueryKeys.GET_CHECKOUT_WITH_USERID, bookID, userID],
    () => getCheckoutByUserIDAPI({ bookID, userID }),
    {
      enabled: enabled && !!bookID,
    }
  );
};
