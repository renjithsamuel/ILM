import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IUser, User } from "@/entity/User/User";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";

export type GetAllUsersRequest = {
  page: number;
  limit: number;
  orderBy: string;
  sortBy: string;
};
export type GetAllUsersResponse = AxiosResponse<{
  totalPages: number;
  users: User[];
}>;
export type GetAllUsersAPIResponse = { totalPages: number; users: IUser[] };

export const getAllUsersAPI = async ({
  page,
  limit,
  orderBy,
  sortBy,
}: GetAllUsersRequest): Promise<GetAllUsersResponse> => {
  const response = await PrivateAxios.get<GetAllUsersAPIResponse>(
    `/allusers?sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&limit=${limit}`
  );

  let users: User[] = response.data.users.map((user) => new User(user));

  return {
    ...response,
    data: { totalPages: response.data.totalPages, users },
  };
};

export const useGetAllUsersAPI = (
  request: GetAllUsersRequest,
  enabled = true
): UseQueryResult<GetAllUsersResponse, AxiosError> => {
  return useQuery<GetAllUsersResponse, AxiosError>(
    [QueryKeys.GET_USERS, { ...request }],
    () => getAllUsersAPI(request),
    {
      enabled,
    }
  );
};
