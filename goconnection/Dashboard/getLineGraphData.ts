import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import { GraphData, IGraphData } from "@/entity/GraphData/GraphData";
import dayjs from "dayjs";

export type GetLineGraphDataResponse = AxiosResponse<GraphData[]>;
export type GetLineGraphDataAPIResponse = { graphData: IGraphData[] };

export const getLineGraphDataAPI =
  async (): Promise<GetLineGraphDataResponse> => {
    const response = await PrivateAxios.get<GetLineGraphDataAPIResponse>(
      `/dashboards/linegraph`
    );

    let graphArray: GraphData[] = response.data.graphData.map(
      (item) =>
        new GraphData({
          ...item,
          month: new Date(item.month).toLocaleString("default", {
            month: "short",
          }),
        })
    );

    return {
      ...response,
      data: graphArray,
    };
  };

export const useGetLineGraphDataAPI = (
  enabled = true
): UseQueryResult<GetLineGraphDataResponse, AxiosError> => {
  return useQuery<GetLineGraphDataResponse, AxiosError>(
    [QueryKeys.GET_LINE_GRAPH_DATA],
    () => getLineGraphDataAPI(),
    {
      enabled,
    }
  );
};
