import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useDashboardDataBoardStyles } from "./DashboardDataBoard.styles";
import { themeValues } from "@/constants/ThemeConstants";
import theme from "@/styles/theme";
import { BoardData } from "@/entity/BoardData/boardData";
import { FormatTextUtil } from "@/utils/formatText";
import { useDashboardDataBoard } from "./DashboardDataBoard.hooks";
import Link from "next/link";
import { sideMenuItems } from "@/constants/GlobalConstants";

interface dashboardDataBoardParams {}

export const DashboardDataBoard = ({}: dashboardDataBoardParams) => {
  const { boardData } = useDashboardDataBoard({});
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
                    {!!boardData && item.value(boardData)}
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
                  {!!boardData && item.value(boardData)}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
      {/* Buttons */}
      <Box className={classes.dataBoardBtns}>
        {/* Transactions Button */}
        <Button
          variant="contained"
          className={classes.dataBoardBtn}
          component={Link}
          href={sideMenuItems.Transactions.link}
        >
          <Typography variant="body2" sx={{ mr: theme.spacing(0.6) }}>
            {"Transactions"}
          </Typography>
          {/* <MdOutlineDone size={theme.spacing(2.2)} /> */}
          {"  "}
        </Button>
        {/* Manage Users */}
        <Button
          variant="contained"
          className={classes.dataBoardBtn}
          component={Link}
          href={sideMenuItems.Users.link}
        >
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
  {
    label: "Users",
    value: (boardData: BoardData) =>
      FormatTextUtil.formatNumberToK(boardData.usersCount),
  },
  {
    label: "Books",
    value: (boardData: BoardData) =>
      FormatTextUtil.formatNumberToK(boardData.booksCount),
  },
  {
    label: "Checkouts",
    value: (boardData: BoardData) =>
      FormatTextUtil.formatNumberToK(boardData.checkoutsCount),
  },
  {
    label: "Revenue",
    value: (boardData: BoardData) =>
      FormatTextUtil.formatNumberToK(boardData.revenueAmount),
  },
];

const thisMonthList = [
  {
    label: "books added",
    value: (boardData: BoardData) =>
      FormatTextUtil.formatNumberToK(boardData.monthlyNewBooksAddedCount),
  },
  {
    label: "Registered Users",
    value: (boardData: BoardData) =>
      FormatTextUtil.formatNumberToK(boardData.monthlyNewRegisteredUserCount),
  },
  {
    label: "Transactions",
    value: (boardData: BoardData) =>
      FormatTextUtil.formatNumberToK(boardData.monthlyNewCheckoutTicketsCount),
  },
  {
    label: "Fine Amount",
    value: (boardData: BoardData) =>
      FormatTextUtil.formatNumberToK(boardData.monthlyFineAmountTotal),
  },
];
