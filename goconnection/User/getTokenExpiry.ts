import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetTokenExpiryResponse = AxiosResponse<{ message: string }>;
export type GetTokenExpiryAPIResponse = { message: string };

export const getTokenExpiryAPI = async (): Promise<GetTokenExpiryResponse> => {
  const response =
    await PrivateAxios.get<GetTokenExpiryAPIResponse>(`/tokenexpiry`);

  return {
    ...response,
    data: response.data,
  };
};

export const useGetTokenExpiryAPI = (
  enabled = true,
): UseQueryResult<GetTokenExpiryResponse, AxiosError> => {
  return useQuery<GetTokenExpiryResponse, AxiosError>(
    [QueryKeys.GET_TOKEN_EXPIRY],
    () => getTokenExpiryAPI(),
    {
      enabled,
    },
  );
};

//token has expired
