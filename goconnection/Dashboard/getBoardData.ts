import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import { BoardData, IBoardData } from "@/entity/BoardData/boardData";

export type GetBoardDataResponse = AxiosResponse<BoardData>;
export type GetBoardDataAPIResponse = {
  boardData: IBoardData;
};

export const getBoardDataAPI = async (): Promise<GetBoardDataResponse> => {
  const response = await PrivateAxios.get<GetBoardDataAPIResponse>(
    `/dashboards/databoard`
  );
  return {
    ...response,
    data: new BoardData(response.data.boardData),
  };
};

export const useGetBoardDataAPI = (
  enabled = true
): UseQueryResult<GetBoardDataResponse, AxiosError> => {
  return useQuery<GetBoardDataResponse, AxiosError>(
    [QueryKeys.GET_DATA_BOARD],
    () => getBoardDataAPI(),
    {
      enabled,
    }
  );
};
