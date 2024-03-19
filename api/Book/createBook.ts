import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios } from "../index";
import { Book } from "@/entity/Book/Book";

export type CreateBookRequest = { book: Book };

export type CreateBookResponse = {
  message: string;
};

export const createBookAPI = async ({
  book,
}: CreateBookRequest): Promise<AxiosResponse<CreateBookResponse>> => {
  return PrivateAxios.post(`/books`, book);
};

export const useCreateBookAPI = (): UseMutationResult<
  AxiosResponse<CreateBookResponse>,
  AxiosError<CreateBookResponse>,
  CreateBookRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<CreateBookResponse>,
    AxiosError<CreateBookResponse>,
    CreateBookRequest
  >(createBookAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.GET_BOOK);
      queryClient.invalidateQueries(QueryKeys.GET_ALL_BOOKS);
    },
  });
};
