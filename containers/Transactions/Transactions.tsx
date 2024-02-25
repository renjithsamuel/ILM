import { Tooltip } from "@material-ui/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTransactionsStyles } from "./Transactions.styles";
import {
  MdDone,
  MdExpandMore,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { themeValues } from "@/constants/ThemeConstants";
import { SortOrder, TransactionSortValue } from "@/constants/GlobalConstants";
import { useTransactions } from "./Transactions.hooks";
import Link from "next/link";
import dayjs from "dayjs";

interface transactionsParams {}

export const Transactions = ({}: transactionsParams) => {
  const {
    checkedOutList,
    searchText,
    sortByOrder,
    sortByValue,
    handleSortOrder,
    handleSortValue,
    handleSearch,
  } = useTransactions({});

  const classes = useTransactionsStyles();

  return (
    <>
      <Box className={classes.transactionsRoot}>
        {/* sort and search */}
        <Box className={classes.sortByContainer}>
          {/* sort */}
          {/* sort by value */}
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-controlled-open-select-label">
              Sort By
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={sortByValue}
              label="Sort By"
              onChange={handleSortValue}
            >
              {Object.keys(TransactionSortValue).map((key, index) => (
                <MenuItem value={key} key={index}>
                  {
                    TransactionSortValue[
                      key as keyof typeof TransactionSortValue
                    ]
                  }
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* order */}
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-controlled-open-select-label">
              Order By
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={sortByOrder}
              label="Order By"
              onChange={handleSortOrder}
            >
              <MenuItem value={SortOrder.asc}>Ascending</MenuItem>
              <MenuItem value={SortOrder.desc}>Descending</MenuItem>
            </Select>
          </FormControl>
          {/* search */}
          <Box className={classes.searchInputWrap}>
            <input
              placeholder="Type any Name/ISBN/email"
              type="text"
              name="searchBar"
              className={classes.searchInput}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {/* <TextField
              id="filled-required"
              label="Type any Name/ISBN/email"
              defaultValue={searchText}
              variant="outlined"
              className={classes.searchInput}
              sx={{ padding: 0 }}
              onChange={(e) => handleSearch(e.target.value)}
            /> */}
            {/* search Icon */}
            <IoIosSearch
              size={themeValues.spacing(2.5)}
              color={themeValues.color.color1}
            />
          </Box>
        </Box>
        {/* accordion wrap */}
        <Box>
          {checkedOutList.map((item, index) => (
            <Accordion key={index}>
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
                        <Typography variant="body1">
                          {item.book?.title}
                        </Typography>
                      </Tooltip>
                      {/* user name */}
                      <Tooltip title={"book title"} placement="bottom">
                        <Typography variant="body1">
                          {item.user?.name}
                        </Typography>
                      </Tooltip>
                    </>
                  </Box>
                  <Box className={classes.summaryFromAndTo}>
                    {/* checked out date? checked out date : reserved date */}
                    <Tooltip
                      title={
                        item.checkedOutOn ? "checkedout on" : "reserved on"
                      }
                      placement="top"
                    >
                      <Typography variant="body1">
                        {item.checkedOutOn
                          ? dayjs(item.checkedOutOn)
                              .format("DD-MM-YYYY")
                              .toString()
                          : dayjs(item.reservatedOn)
                              .format("DD-MM-YYYY")
                              .toString()}
                      </Typography>
                    </Tooltip>
                    {" - "}
                    {/* returned date? returned date : checkoutDate ? checkoutDate + numberOfDays : nil  */}
                    <Tooltip
                      title={
                        item.returnedDate ? "returned on" : "expected return"
                      }
                      placement="top"
                    >
                      <Typography variant="body1">
                        {item.returnedDate
                          ? dayjs(item.returnedDate)
                              .format("DD-MM-YYYY")
                              .toString()
                          : item.checkedOutOn
                          ? dayjs(item.checkedOutOn)
                              .add(item.numberOfDays, "day")
                              .toString()
                          : "nil"}
                      </Typography>
                    </Tooltip>
                    <Box className={classes.summaryIcon}>
                      {item.returnedDate ? (
                        <MdDone size={themeValues.spacing(2)} />
                      ) : item.checkedOutOn ? (
                        <MdOutlineShoppingCartCheckout
                          size={themeValues.spacing(2)}
                        />
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
                      href={`/bookshelf/$`}
                      className={classes.detailsBox}
                    >
                      {/* book details */}
                      <Box className={classes.ItemWrap}>
                        {/* Book Name */}
                        <Typography variant="body1" className={classes.ItemKey}>
                          {"Book Name "}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.ItemValue}
                        >
                          {item.book?.title}
                        </Typography>
                      </Box>
                      <Box className={classes.ItemWrap}>
                        {/* ISBN */}
                        <Typography variant="body1" className={classes.ItemKey}>
                          {"Book ISBN "}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.ItemValue}
                        >
                          {item.book?.ISBN}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      component={Link}
                      href={`/users/$`}
                      className={classes.detailsBox}
                    >
                      {/* user details */}
                      <Box className={classes.ItemWrap}>
                        {/* user name  */}
                        <Typography variant="body1" className={classes.ItemKey}>
                          {"Username "}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.ItemValue}
                        >
                          {item.user?.name}
                        </Typography>
                      </Box>
                      <Box className={classes.ItemWrap}>
                        {/* email  */}
                        <Typography variant="body1" className={classes.ItemKey}>
                          {"Email "}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.ItemValue}
                        >
                          {item.user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={classes.dateBoxWrap}>
                    {/* dates */}
                    <Box className={classes.dateBox}>
                      {/* reserved */}
                      <Typography variant="body1" className={classes.dateKey}>
                        {"Reserved On "}
                      </Typography>
                      <Typography variant="body1" className={classes.dateValue}>
                        {dayjs(item.reservatedOn)
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
                        {item.checkedOutOn &&
                          dayjs(item.checkedOutOn)
                            .format("DD-MM-YYYY")
                            .toString()}
                      </Typography>
                    </Box>
                    <Box className={classes.dateBox}>
                      {/* expected or actual return date */}
                      <Typography variant="body1" className={classes.dateKey}>
                        {item.returnedDate
                          ? "Returned on"
                          : "Expected Return On"}
                      </Typography>
                      <Typography variant="body1" className={classes.dateValue}>
                        {item.returnedDate
                          ? dayjs(item.returnedDate)
                              .format("DD-MM-YYYY")
                              .toString()
                          : item.checkedOutOn
                          ? dayjs(item.checkedOutOn)
                              .add(item.numberOfDays, "day")
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
                        item.book?.booksLeft === 0 || item.checkedOutOn
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
                      // disabled={book.booksLeft === 0 ? true : false}
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
                    {/* checkout */}
                    <Button
                      variant="contained"
                      className={classes.actionBtn}
                      disabled={item.returnedDate ? true : false}
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
          ))}
        </Box>
      </Box>
    </>
  );
};
