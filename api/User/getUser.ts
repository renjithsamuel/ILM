import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IUser, User } from "@/entity/User/User";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetUserResponse = AxiosResponse<User>;
export type GetUserAPIResponse = IUser;

export const getUserAPI = async (): Promise<GetUserResponse> => {
  const response = await PrivateAxios.get<GetUserAPIResponse>(`/users`);

  return {
    ...response,
    data: new User(response?.data),
  };
};

export const useGetUserAPI = (
  enabled = true,
): UseQueryResult<GetUserResponse, AxiosError> => {
  return useQuery<GetUserResponse, AxiosError>(
    [QueryKeys.GET_USER],
    () => getUserAPI(),
    {
      enabled,
    },
  );
};
