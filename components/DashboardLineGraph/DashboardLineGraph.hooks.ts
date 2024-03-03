import { GraphData } from "@/entity/GraphData/GraphData";
import { mockGraphData } from "@/entity/GraphData/GraphData.mock";
import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
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
    const [graphData, setGraphData] = useState<GraphData[]>([]);

    const [state, setState] = useState({
      opacity: {
        uv: 1,
        pv: 1,
      },
    });

    //  getGraphData(currentUser._id);
    useEffect(() => {
      setGraphData(mockGraphData);
    }, []);

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
