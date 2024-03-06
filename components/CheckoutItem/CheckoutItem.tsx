import { useCheckoutItemStyles } from "./CheckoutItem.styles";
import {
  MdDone,
  MdExpandMore,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Tooltip } from "@material-ui/core";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { themeValues } from "@/constants/ThemeConstants";
import dayjs from "dayjs";
import Link from "next/link";

interface checkoutItemParams {
  checkoutItem: CheckoutTicket;
}

export const CheckoutItem = ({ checkoutItem }: checkoutItemParams) => {
  const classes = useCheckoutItemStyles();
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={classes.accordionActualSummaryRoot}
        >
          <Box className={classes.accordionSummaryRoot}>
            <Box className={classes.summaryUserAndBook}>
              <>
                {/* book name */}
                <Tooltip title={"book title"} placement="top">
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: themeValues.font.fontWeightThick }}
                  >
                    {checkoutItem.book?.title}
                  </Typography>
                </Tooltip>
                {/* user name */}
                <Tooltip title={"username"} placement="bottom">
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {checkoutItem.user?.name}
                  </Typography>
                </Tooltip>
              </>
            </Box>
            <Box className={classes.summaryFromAndTo}>
              {/* checked out date? checked out date : reserved date */}
              <Tooltip
                title={
                  checkoutItem.checkedOutOn ? "checkedout on" : "reserved on"
                }
                placement="top"
              >
                <Typography variant="body1">
                  {checkoutItem.checkedOutOn
                    ? dayjs(checkoutItem.checkedOutOn)
                        .format("DD-MM-YYYY")
                        .toString()
                    : dayjs(checkoutItem.reservatedOn)
                        .format("DD-MM-YYYY")
                        .toString()}
                </Typography>
              </Tooltip>
              {" - "}
              {/* returned date? returned date : checkoutDate ? checkoutDate + numberOfDays : nil  */}
              <Tooltip
                title={
                  checkoutItem.returnedDate ? "returned on" : "expected return"
                }
                placement="top"
              >
                <Typography variant="body1">
                  {checkoutItem.returnedDate
                    ? dayjs(checkoutItem.returnedDate)
                        .format("DD-MM-YYYY")
                        .toString()
                    : checkoutItem.checkedOutOn
                    ? dayjs(checkoutItem.checkedOutOn)
                        .add(checkoutItem.numberOfDays, "day")
                        .format("DD-MM-YYYY")
                        .toString()
                    : "nil"}
                </Typography>
              </Tooltip>
              {/* summary icon */}
              <Box>
                {checkoutItem.returnedDate ? (
                  <Tooltip title={"returned"} placement="top">
                    <Box className={classes.summaryIcon}>
                      <MdDone size={themeValues.spacing(2)} />
                    </Box>
                  </Tooltip>
                ) : checkoutItem.checkedOutOn ? (
                  <Tooltip title={"checked out"} placement="top">
                    <Box className={classes.summaryIcon}>
                      <MdOutlineShoppingCartCheckout
                        size={themeValues.spacing(2)}
                      />
                    </Box>
                  </Tooltip>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        {/* expanded */}
        <AccordionDetails>
          <Box className={classes.detailBoxRoot}>
            <Box className={classes.topDetailBox}>
              {/* top 2 boxes */}
              <Box
                component={Link}
                href={`/allbooks/${checkoutItem.book?.ID}`}
                className={classes.detailsBox}
              >
                {/* book details */}
                <Box className={classes.ItemWrap}>
                  {/* Book Name */}
                  <Typography variant="body1" className={classes.ItemKey}>
                    {"Book Name "}
                  </Typography>
                  <Typography variant="body1" className={classes.ItemValue}>
                    {checkoutItem.book?.title}
                  </Typography>
                </Box>
                <Box className={classes.ItemWrap}>
                  {/* ISBN */}
                  <Typography variant="body1" className={classes.ItemKey}>
                    {"Book ISBN "}
                  </Typography>
                  <Typography variant="body1" className={classes.ItemValue}>
                    {checkoutItem.book?.ISBN}
                  </Typography>
                </Box>
              </Box>
              <Box
                component={Link}
                href={`/users/${checkoutItem.userID}`}
                className={classes.detailsBox}
              >
                {/* user details */}
                <Box className={classes.ItemWrap}>
                  {/* user name  */}
                  <Typography variant="body1" className={classes.ItemKey}>
                    {"Username "}
                  </Typography>
                  <Typography variant="body1" className={classes.ItemValue}>
                    {checkoutItem.user?.name}
                  </Typography>
                </Box>
                <Box className={classes.ItemWrap}>
                  {/* email  */}
                  <Typography variant="body1" className={classes.ItemKey}>
                    {"Email "}
                  </Typography>
                  <Typography variant="body1" className={classes.ItemValue}>
                    {checkoutItem.user?.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className={classes.dateBoxWrap}>
              {/* dates */}
              <Box className={classes.dateBox}>
                {/* reserved */}
                <Typography variant="body1" className={classes.dateKey}>
                  {"Fine Amount "}
                </Typography>
                <Typography variant="body1" className={classes.dateValue}>
                  {checkoutItem.fineAmount}
                </Typography>
              </Box>
              <Box className={classes.dateBox}>
                {/* reserved */}
                <Typography variant="body1" className={classes.dateKey}>
                  {"Reserved On "}
                </Typography>
                <Typography variant="body1" className={classes.dateValue}>
                  {dayjs(checkoutItem.reservatedOn)
                    .format("DD-MM-YYYY")
                    .toString()}
                </Typography>
              </Box>
              <Box className={classes.dateBox}>
                {/* checked out */}
                <Typography variant="body1" className={classes.dateKey}>
                  {"Checked out On "}
                </Typography>
                <Typography variant="body1" className={classes.dateValue}>
                  {checkoutItem.checkedOutOn &&
                    dayjs(checkoutItem.checkedOutOn)
                      .format("DD-MM-YYYY")
                      .toString()}
                </Typography>
              </Box>
              <Box className={classes.dateBox}>
                {/* expected or actual return date */}
                <Typography variant="body1" className={classes.dateKey}>
                  {checkoutItem.returnedDate
                    ? "Returned on"
                    : "Expected Return On"}
                </Typography>
                <Typography variant="body1" className={classes.dateValue}>
                  {checkoutItem.returnedDate
                    ? dayjs(checkoutItem.returnedDate)
                        .format("DD-MM-YYYY")
                        .toString()
                    : checkoutItem.checkedOutOn
                    ? dayjs(checkoutItem.checkedOutOn)
                        .add(checkoutItem.numberOfDays, "day")
                        .format("DD-MM-YYYY")
                        .toString()
                    : "nil"}
                </Typography>
              </Box>
            </Box>
            {/* three buttons */}
            <Box className={classes.actionButtonsAccordionDetails}>
              {/* checkout */}
              <Button
                variant="contained"
                className={classes.actionBtn}
                disabled={
                  checkoutItem.book?.booksLeft === 0 ||
                  checkoutItem.checkedOutOn
                    ? true
                    : false
                }
              >
                <Typography
                  variant="body2"
                  sx={{ mr: themeValues.spacing(0.6) }}
                >
                  Checkout
                </Typography>
                <MdOutlineShoppingCartCheckout
                  size={themeValues.spacing(2.2)}
                />
              </Button>
              {/* returned */}
              <Button
                variant="contained"
                className={classes.actionBtn}
                disabled={checkoutItem.returnedDate ? true : false}
              >
                <Typography
                  variant="body2"
                  sx={{ mr: themeValues.spacing(0.6) }}
                >
                  Return
                </Typography>
                <MdOutlineShoppingCartCheckout
                  size={themeValues.spacing(2.2)}
                />
              </Button>
              {/* extend date */}
              <Button
                variant="contained"
                className={classes.actionBtn}
                disabled={checkoutItem.returnedDate ? true : false}
              >
                <Typography
                  variant="body2"
                  sx={{ mr: themeValues.spacing(0.6) }}
                >
                  Extend
                </Typography>
                <MdOutlineShoppingCartCheckout
                  size={themeValues.spacing(2.2)}
                />
              </Button>
              {/* checkout */}
              <Button
                variant="contained"
                className={classes.actionBtn}
                disabled={checkoutItem.isCheckedOut}
              >
                <Typography
                  variant="body2"
                  sx={{ mr: themeValues.spacing(0.6) }}
                >
                  Delete
                </Typography>
                <MdOutlineShoppingCartCheckout
                  size={themeValues.spacing(2.2)}
                />
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
