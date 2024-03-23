import { usePageContext } from "@/context/PageContext";
import { GraphData } from "@/entity/GraphData/GraphData";
import { mockGraphData } from "@/entity/GraphData/GraphData.mock";
import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { useGetLineGraphDataAPI } from "@/goconnection/Dashboard/getLineGraphData";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Payload } from "recharts/types/component/DefaultLegendContent";

interface dashboardLineGraphHookProps {}

interface dashboardLineGraphHook {
  graphData: GraphData[];
  handleMouseEnter: (o: Payload) => void;
  handleMouseLeave: (o: Payload) => void;
  state: stateType;
}

export const useDashboardLineGraphLineGraph =
  ({}: dashboardLineGraphHookProps): dashboardLineGraphHook => {
    const { setSnackBarError } = usePageContext();
    const {
      data: graphDataResponse,
      isError: isGraphDataError,
      isSuccess: isGraphDataSuccess,
    } = useGetLineGraphDataAPI();

    useEffect(() => {
      if (isGraphDataError) {
        setSnackBarError({
          ErrorMessage: "fetch graph failed!",
          ErrorSeverity: "error",
        });
      }
    }, [isGraphDataError]);

    const [graphData, setGraphData] = useState<GraphData[]>([]);

    const [state, setState] = useState({
      opacity: {
        uv: 1,
        pv: 1,
      },
    });

    //  getGraphData(currentUser._id);
    useEffect(() => {
      if (isGraphDataSuccess && graphDataResponse?.data) {
        console.log("graphDataResponse?.data", graphDataResponse?.data);
        setGraphData(graphDataResponse?.data);
      }
    }, [isGraphDataSuccess]);

    let handleMouseEnter = (o: Payload) => {
      const { dataKey } = o;
      const { opacity } = state;

      setState({
        opacity: { ...opacity, [dataKey as string]: 0.5 },
      });
    };

    let handleMouseLeave = (o: Payload) => {
      const { dataKey } = o;
      const { opacity } = state;

      setState({
        opacity: { ...opacity, [dataKey as string]: 1 },
      });
    };

    return {
      state,
      graphData,
      handleMouseEnter,
      handleMouseLeave,
    };
  };

export type stateType = {
  opacity: {
    uv: number;
    pv: number;
  };
};
