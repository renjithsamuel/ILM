import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useDashboardDataBoardStyles = makeStyles((theme) => ({
  dashboardDataBoardTop: {
    display: "flex",
    gap: theme.spacing(3),
    animation: themeValues.animation.slideUp,
  },
  dataChips: {
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(4),
    flexWrap: "wrap",
  },
  dataChip: {
    width: "14vw",
    height: "13vh",
    backgroundColor: themeValues.color.lightGray,
    color: themeValues.color.color1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: themeValues.border.borderRadiusHigh,
    boxShadow: themeValues.shadow.boxShadowboxy,
    transition: themeValues.transition.defaultTansition,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
      cursor: "default",
    },
  },
  thisMonths: {
    width: "40%",
    color: themeValues.color.color1,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: theme.spacing(1),
    justifyContent: "start",
  },
  thisMonth: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(5),
  },
  thisMonthKey: {
    width: "50%",
    alignSelf: "start",
  },
  thisMonthValue: {
    width: "50%",
    alignSelf: "end",
  },
  dataBoardBtns: { display: "flex", gap: theme.spacing(3) },
  dataBoardBtn: {
    color: themeValues.color.white,
    backgroundColor: themeValues.color.color1,
    "&:hover": {
      color: themeValues.color.white,
      backgroundColor: themeValues.color.color3,
    },
  },
}));
