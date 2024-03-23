import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios } from "../index";
import { Book } from "@/entity/Book/Book";

export type CreateAllBookRequest = { books: Book[] };

export type CreateAllBookResponse = {
  message: string;
};

export const createAllBookAPI = async ({
  books,
}: CreateAllBookRequest): Promise<AxiosResponse<CreateAllBookResponse>> => {
  return PrivateAxios.post(`/allbooks`, books);
};

export const useCreateAllBookAPI = (): UseMutationResult<
  AxiosResponse<CreateAllBookResponse>,
  AxiosError<CreateAllBookResponse>,
  CreateAllBookRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<CreateAllBookResponse>,
    AxiosError<CreateAllBookResponse>,
    CreateAllBookRequest
  >(createAllBookAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.GET_BOOK);
      queryClient.invalidateQueries(QueryKeys.GET_ALL_BOOKS);
    },
  });
};
