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
  Tooltip,
  Typography,
} from "@mui/material";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { themeValues } from "@/constants/ThemeConstants";
import dayjs from "dayjs";
import Link from "next/link";
import { FormatTextUtil } from "@/utils/formatText";
import { useCheckoutItem } from "./CheckoutItem.hooks";
import { ExtendCheckout } from "../ExtendCheckout/ExtendCheckout";
import { BiMoneyWithdraw } from "react-icons/bi";
import { ModifyFineAmount } from "../ModifyFineAmount/ModifyFineAmount";
interface checkoutItemParams {
  checkoutItem: CheckoutTicket;
}

export const CheckoutItem = ({ checkoutItem }: checkoutItemParams) => {
  const {
    isExtendOpen,
    isModifyFineAmountOpen,
    handleModifyFineAmount,
    handleCheckout,
    handleReturn,
    handleExtendOpen,
    handleExtend,
    handleDeleteCheckout,
  } = useCheckoutItem({
    checkoutItem,
  });
  const classes = useCheckoutItemStyles();
  return (
    <>
      {/* add comment popup */}
      {isExtendOpen && (
        <ExtendCheckout
          handleExtendOpen={handleExtendOpen}
          handleExtend={handleExtend}
          numberOfDays={checkoutItem.numberOfDays}
        />
      )}
      {/* modify fine Amount popup */}
      {isModifyFineAmountOpen && (
        <ModifyFineAmount
          handleModifyFineAmount={handleModifyFineAmount}
          checkoutItem={checkoutItem}
        />
      )}
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
                    ? FormatTextUtil.formatDate(checkoutItem.checkedOutOn)
                    : FormatTextUtil.formatDate(checkoutItem.reservedOn)}
                </Typography>
              </Tooltip>
              {" - "}
              {/* returned date? returned date : checkoutDate ? checkoutDate + numberOfDays : nil  */}
              <Tooltip
                title={
                  checkoutItem.returnedDate &&
                  new Date(checkoutItem.returnedDate)?.toISOString() !==
                    "0001-01-01T00:00:00.000Z"
                    ? "Returned on"
                    : "Expected Return On"
                }
                placement="top"
              >
                <Typography variant="body1">
                  {checkoutItem.returnedDate &&
                  new Date(checkoutItem.returnedDate)?.toISOString() !==
                    "0001-01-01T00:00:00.000Z"
                    ? FormatTextUtil.formatDate(checkoutItem.returnedDate)
                    : checkoutItem.checkedOutOn &&
                        new Date(checkoutItem.checkedOutOn)?.toISOString() !==
                          "0001-01-01T00:00:00.000Z"
                      ? dayjs(checkoutItem.checkedOutOn)
                          .add(checkoutItem.numberOfDays, "day")
                          .format("D MMMM, YYYY")
                          .toString()
                      : "nil"}
                </Typography>
              </Tooltip>
              {/* summary icon */}
              <Box>
                {checkoutItem.isReturned ? (
                  <Tooltip title={"returned"} placement="top">
                    <Box className={classes.summaryIcon}>
                      <MdDone size={themeValues.spacing(2)} />
                    </Box>
                  </Tooltip>
                ) : checkoutItem.isCheckedOut ? (
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
                href={`/allbooks/${checkoutItem.book?.ISBN}`}
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
                  {"No Of Days "}
                </Typography>
                <Typography variant="body1" className={classes.dateValue}>
                  {checkoutItem.numberOfDays}
                </Typography>
              </Box>
              <Box className={classes.dateBox}>
                {/* reserved */}
                <Typography variant="body1" className={classes.dateKey}>
                  {"Reserved On "}
                </Typography>
                <Typography variant="body1" className={classes.dateValue}>
                  {FormatTextUtil.formatDate(checkoutItem.reservedOn)}
                </Typography>
              </Box>
              <Box className={classes.dateBox}>
                {/* checked out */}
                <Typography variant="body1" className={classes.dateKey}>
                  {"Checked out On "}
                </Typography>
                <Typography variant="body1" className={classes.dateValue}>
                  {checkoutItem.checkedOutOn &&
                    FormatTextUtil.formatDate(checkoutItem.checkedOutOn)}
                </Typography>
              </Box>
              <Box className={classes.dateBox}>
                {/* expected or actual return date */}
                <Typography variant="body1" className={classes.dateKey}>
                  {checkoutItem.returnedDate &&
                  new Date(checkoutItem.returnedDate)?.toISOString() !==
                    "0001-01-01T00:00:00.000Z"
                    ? "Returned on"
                    : "Expected Return On"}
                </Typography>
                <Typography variant="body1" className={classes.dateValue}>
                  {checkoutItem.returnedDate &&
                  new Date(checkoutItem.returnedDate)?.toISOString() !==
                    "0001-01-01T00:00:00.000Z"
                    ? FormatTextUtil.formatDate(checkoutItem.returnedDate)
                    : checkoutItem.checkedOutOn &&
                        new Date(checkoutItem.checkedOutOn)?.toISOString() !==
                          "0001-01-01T00:00:00.000Z"
                      ? dayjs(checkoutItem.checkedOutOn)
                          .add(checkoutItem.numberOfDays, "day")
                          .format("D MMMM, YYYY")
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
                  // not getting reserved on will disable the button
                  !(
                    checkoutItem.reservedOn &&
                    new Date(checkoutItem.reservedOn)?.toISOString() !==
                      "0001-01-01T00:00:00.000Z"
                  ) || // or
                  // getting checked out on will disable the button
                  !!(
                    checkoutItem.checkedOutOn &&
                    new Date(checkoutItem.checkedOutOn)?.toISOString() !==
                      "0001-01-01T00:00:00.000Z"
                  )
                    ? true
                    : false
                }
                onClick={handleCheckout}
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
                disabled={
                  // not getting checked out on will make it disabled
                  !(
                    checkoutItem.checkedOutOn &&
                    new Date(checkoutItem.checkedOutOn)?.toISOString() !==
                      "0001-01-01T00:00:00.000Z"
                  ) ||
                  // getting returned date will make it disabled
                  !!(
                    checkoutItem.returnedDate &&
                    new Date(checkoutItem.returnedDate)?.toISOString() !==
                      "0001-01-01T00:00:00.000Z"
                  )
                    ? true
                    : false
                }
                onClick={handleReturn}
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
                disabled={
                  checkoutItem.isReturned || !checkoutItem.isCheckedOut
                    ? true
                    : false
                }
                onClick={handleExtendOpen}
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
              {/* Add Fine Amount */}
              <Button
                variant="contained"
                className={classes.actionBtn}
                disabled={
                  !!checkoutItem.isReturned || !checkoutItem.isCheckedOut
                }
                onClick={handleModifyFineAmount}
              >
                <Typography
                  variant="body2"
                  sx={{ mr: themeValues.spacing(0.6) }}
                >
                  {!checkoutItem?.fineAmount ? "Add Fine" : "Modify Fine"}
                </Typography>
                <BiMoneyWithdraw size={themeValues.spacing(2.2)} />
              </Button>
              {/* checkout */}
              <Button
                variant="contained"
                className={classes.actionBtn}
                disabled={checkoutItem.isCheckedOut}
                onClick={handleDeleteCheckout}
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
