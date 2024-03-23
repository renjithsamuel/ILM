import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IUser, User } from "@/entity/User/User";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetUserByIDResponse = AxiosResponse<User>;
export type GetUserByIDAPIResponse = { user: IUser };

export const getUserByIDAPI = async (userID : string): Promise<GetUserByIDResponse> => {
  const response = await PrivateAxios.get<GetUserByIDAPIResponse>(`/users/${userID}`);

  const user = new User(response?.data.user);
  return {
    ...response,
    data: user,
  };
};

export const useGetUserByIDAPI = (
  userID: string,
  enabled = true
): UseQueryResult<GetUserByIDResponse, AxiosError> => {
  return useQuery<GetUserByIDResponse, AxiosError>(
    [QueryKeys.GET_USER_BY_ID, userID],
    () => getUserByIDAPI(userID),
    {
      enabled,
    }
  );
};
