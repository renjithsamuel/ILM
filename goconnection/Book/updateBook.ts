import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios, PublicAxios } from "../index";
import { UserLogin } from "@/types/UserLogin";
import { Book } from "@/entity/Book/Book";

export type UpdateBookRequest = { book: Book };

export type UpdateBookResponse = {
  message: string;
};

export const updateBookAPI = async ({
  book,
}: UpdateBookRequest): Promise<
  AxiosResponse<UpdateBookResponse>
> => {
  return PrivateAxios.put(`/books`, book);
};

export const useUpdateBookAPI = (): UseMutationResult<
  AxiosResponse<UpdateBookResponse>,
  AxiosError<UpdateBookResponse>,
  UpdateBookRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<UpdateBookResponse>,
    AxiosError<UpdateBookResponse>,
    UpdateBookRequest
  >(updateBookAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.GET_BOOK);
      queryClient.invalidateQueries(QueryKeys.GET_ALL_BOOKS);
    },
  });
};
