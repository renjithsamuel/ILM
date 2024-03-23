import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios } from "../index";
import { User } from "@/entity/User/User";

export type UpdateUserRequest = { user: User };

export type UpdateUserResponse = {
  message: string;
};

export const registerUserAPI = async ({
  user,
}: UpdateUserRequest): Promise<AxiosResponse<UpdateUserResponse>> => {
  return PrivateAxios.put(`/users`, user);
};

export const useUpdateUserAPI = (): UseMutationResult<
  AxiosResponse<UpdateUserResponse>,
  AxiosError<UpdateUserResponse>,
  UpdateUserRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<UpdateUserResponse>,
    AxiosError<UpdateUserResponse>,
    UpdateUserRequest
  >(registerUserAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.UPDATE_USER);
      queryClient.invalidateQueries(QueryKeys.GET_USER);
    },
  });
};
