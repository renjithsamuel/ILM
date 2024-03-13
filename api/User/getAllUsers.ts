import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IUser, User } from "@/entity/User/User";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetAllUsersResponse = AxiosResponse<User[]>;
export type GetAllUsersAPIResponse = { users: IUser[] };

export const getAllUsersAPI = async (): Promise<GetAllUsersResponse> => {
  const response = await PrivateAxios.get<GetAllUsersAPIResponse>(`/allusers`);

  let users: User[] = response.data.users.map((user) => new User(user));

  return {
    ...response,
    data: users,
  };
};

export const useGetAllUsersAPI = (
  enabled = true
): UseQueryResult<GetAllUsersResponse, AxiosError> => {
  return useQuery<GetAllUsersResponse, AxiosError>(
    [QueryKeys.GET_USERS],
    () => getAllUsersAPI(),
    {
      enabled,
    }
  );
};
