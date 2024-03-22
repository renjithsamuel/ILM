import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useDashboardDataBoardStyles } from "./DashboardDataBoard.styles";
import { themeValues } from "@/constants/ThemeConstants";
import theme from "@/styles/theme";

interface dashboardDataBoardParams {}

export const DashboardDataBoard = ({}: dashboardDataBoardParams) => {
  const classes = useDashboardDataBoardStyles();
  return (
    <>
      <Box className={classes.dashboardDataBoardTop}>
        {/* Left Chips */}
        <Grid container spacing={2} className={classes.dataChips}>
          {chipList?.length > 0 &&
            chipList.map((item, index) => (
              <Grid item key={index} xs={6} sm={4} md={5}>
                <Box className={classes.dataChip}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: themeValues.font.fontWeightThick }}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
        <Divider orientation="vertical" flexItem variant="middle" />
        {/* right this month */}
        <Box className={classes.thisMonths}>
          <Typography
            variant="h6"
            sx={{ fontWeight: themeValues.font.fontWeightThick }}
          >
            {"This Month"}
          </Typography>
          {thisMonthList?.length > 0 &&
            thisMonthList.map((item, index) => (
              <Box className={classes.thisMonth} key={index}>
                <Typography variant="body1" className={classes.thisMonthKey}>
                  {item.label}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  className={classes.thisMonthValue}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
      {/* Buttons */}
      <Box className={classes.dataBoardBtns}>
        {/* Transactions Button */}
        <Button variant="contained" className={classes.dataBoardBtn}>
          <Typography variant="body2" sx={{ mr: theme.spacing(0.6) }}>
            {"Transactions"}
          </Typography>
          {/* <MdOutlineDone size={theme.spacing(2.2)} /> */}
          {"  "}
        </Button>
        {/* Manage Users */}
        <Button variant="contained" className={classes.dataBoardBtn}>
          <Typography variant="body2" sx={{ mr: theme.spacing(0.6) }}>
            {"Manage Users"}
          </Typography>
          {/* <MdOutlineDone size={theme.spacing(2.2)} /> */}
          {"  "}
        </Button>
      </Box>
    </>
  );
};

const chipList = [
  { label: "Users", value: "1.8k" },
  { label: "Books", value: "3.2k" },
  { label: "Checkouts", value: "6.8k" },
  { label: "Revenue", value: "1.2k" },
];

const thisMonthList = [
  { label: "books added", value: "800" },
  { label: "Registered Users", value: "330" },
  { label: "Transactions", value: "620" },
  { label: "Fine Amount", value: "1230" },
];
