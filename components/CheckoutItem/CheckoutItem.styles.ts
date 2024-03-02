import { themeValues } from "@/constants/ThemeConstants";
import { makeStyles } from "@mui/styles";

export const useCheckoutItemStyles = makeStyles((theme) => ({
  accordionActualSummaryRoot: {
    boxShadow: themeValues.shadow.boxShadowboxy,
    // backgroundColor: themeValues.color.lightGray,
    borderRadius: themeValues.border.borderRadius,
  },
  accordionSummaryRoot: {
    width: "99%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // color: themeValues.color.color1,
  },
  summaryUserAndBook: {
    display: "flex",
    flexDirection: "column",
  },
  summaryFromAndTo: {
    gap: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    border: themeValues.border.defaultborder,
    borderRadius: "50%",
    // backgroundColor: themeValues.color.lightGray,
  },
  detailBoxRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  topDetailBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
  },
  detailsBox: {
    minWidth: "25vw",
    padding: theme.spacing(2),
    color: themeValues.color.black,
    boxShadow: themeValues.shadow.boxShadowboxy,
    borderRadius: themeValues.border.borderRadius,
    transition: themeValues.transition.defaultTansition,
    "&:hover": {
      boxShadow: themeValues.shadow.boxShadowAttatched,
    },
  },
  ItemWrap: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  ItemKey: {
    width: "50%",
    textAlign: "left",
  },
  ItemValue: {
    width: "50%",
    textAlign: "left",
    opacity: 0.7,
  },
  dateBoxWrap: {
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: themeValues.border.borderRadius,
    boxShadow: themeValues.shadow.boxShadowboxy,
  },
  dateBox: {
    // backgroundColor: themeValues.color.lightGray,
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  dateKey: {
    width: "50%",
    textAlign: "left",
  },
  dateValue: {
    width: "50%",
    textAlign: "right",
    opacity: 0.7,
  },
  actionButtonsAccordionDetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  actionBtn: {
    color: themeValues.color.white,
    backgroundColor: themeValues.color.color1,
    "&:hover": {
      color: themeValues.color.white,
      backgroundColor: themeValues.color.color3,
    },
  },
}));
