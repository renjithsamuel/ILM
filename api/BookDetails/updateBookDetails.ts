import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { QueryKeys } from "@/constants/Querykeys";
import { PrivateAxios } from "../index";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";

export type UpdateBookDetailsRequest = {
  bookDetails: BookDetails;
};

export type UpdateBookDetailsResponse = {
  message: string;
};

export const updateBookDetailsAPI = async ({
  bookDetails,
}: UpdateBookDetailsRequest): Promise<
  AxiosResponse<UpdateBookDetailsResponse>
> => {
  return PrivateAxios.put(`/users/book-details`, bookDetails);
};

export const useUpdateBookDetailsAPI = (): UseMutationResult<
  AxiosResponse<UpdateBookDetailsResponse>,
  AxiosError<UpdateBookDetailsResponse>,
  UpdateBookDetailsRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<UpdateBookDetailsResponse>,
    AxiosError<UpdateBookDetailsResponse>,
    UpdateBookDetailsRequest
  >(updateBookDetailsAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.GET_USERS);
      queryClient.invalidateQueries(QueryKeys.GET_USER);
    },
  });
};
