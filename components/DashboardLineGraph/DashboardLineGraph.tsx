import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDashboardLineGraphStyles } from "./DashboardLineGraph.styles";
import { Box } from "@mui/material";
import { useDashboardLineGraphLineGraph } from "./DashboardLineGraph.hooks";
import { themeValues } from "@/constants/ThemeConstants";

interface dashboardLineGraphParams {}

export const DashboardLineGraph = ({}: dashboardLineGraphParams) => {
  const { state, graphData, handleMouseEnter, handleMouseLeave } =
    useDashboardLineGraphLineGraph({});
  const classes = useDashboardLineGraphStyles();

  return (
    <Box
      className="lineGraphWrapper"
      sx={{ width: "100%", color: themeValues.color.textColor }}
    >
      <ResponsiveContainer width="100%" height={240}>
        <LineChart
          width={740}
          height={240}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Legend
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={(e) => handleMouseLeave(e)}
          />
          <Line
            type="monotone"
            dataKey="numberOfActiveUsers"
            label={"Number Of Active Users"}
            strokeOpacity={state.opacity.uv}
            stroke={themeValues.color.color1}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="numberOfCheckouts"
            label={"Number Of Checkouts"}
            strokeOpacity={state.opacity.uv}
            stroke={themeValues.color.color3}
            activeDot={{ r: 8 }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
