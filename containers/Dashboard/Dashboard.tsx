import { DashboardLineGraph } from "@/components/DashboardLineGraph/DashboardLineGraph";
import { useDashboardStyles } from "./Dashboard.styles";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import theme from "@/styles/theme";
import { DashboardDataBoard } from "@/components/DashboardDataBoard/DashboardDataBoard";
import { DashboardDemandBook } from "@/components/DashboardDemandBook/DashboardDemandBook";
import { useDashboard } from "./Dashboard.hooks";
import { themeValues } from "@/constants/ThemeConstants";

interface dashboardParams {}

export const Dashboard = ({}: dashboardParams) => {
  const { highDemandBooks } = useDashboard({});
  const classes = useDashboardStyles();
  return (
    <>
      <Box className={classes.dashboardRoot}>
        {/* left */}
        <Box className={classes.dashboardLeft}>
          {/* dashboard */}
          <Box className={classes.lineGraphWrap}>
            <DashboardLineGraph />
          </Box>
          {/* data of lib = Quick Stats*/}
          <Box className={classes.dashboardDataBoard}>
            <DashboardDataBoard />
          </Box>
        </Box>
        {/* right */}
        <Box className={classes.dashboardRight}>
          {/* High demand books */}
          <Typography
            variant="h6"
            sx={{ fontWeight: themeValues.font.fontWeightThick }}
          >
            {"High Demand"}
          </Typography>
          {highDemandBooks.map((book) => (
            <Grid item key={book.ID} xs={6} sm={4} md={3}>
              <DashboardDemandBook book={book} />
            </Grid>
          ))}
        </Box>
      </Box>
    </>
  );
};
