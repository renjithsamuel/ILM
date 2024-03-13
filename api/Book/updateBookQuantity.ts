import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios, PublicAxios } from "../index";
import { UserLogin } from "@/types/UserLogin";
import { Book } from "@/entity/Book/Book";

export type UpdateBookQuantityRequest = { book: Book };

export type UpdateBookQuantityResponse = {
  message: string;
};

export const updateBookQuantityAPI = async ({
  book,
}: UpdateBookQuantityRequest): Promise<
  AxiosResponse<UpdateBookQuantityResponse>
> => {
  return PrivateAxios.put(`/books`, book);
};

export const useUpdateBookQuantityAPI = (): UseMutationResult<
  AxiosResponse<UpdateBookQuantityResponse>,
  AxiosError<UpdateBookQuantityResponse>,
  UpdateBookQuantityRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<UpdateBookQuantityResponse>,
    AxiosError<UpdateBookQuantityResponse>,
    UpdateBookQuantityRequest
  >(updateBookQuantityAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.UPDATE_BOOK_QUANTITY);
      queryClient.invalidateQueries(QueryKeys.GET_BOOK);
      queryClient.invalidateQueries(QueryKeys.GET_ALL_BOOKS);
    },
  });
};
