import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
import { CheckoutItem } from "@/components/CheckoutItem/CheckoutItem";
import clsx from "clsx";

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
              <MenuItem value={TransactionSortValue.fineAmount}>
                {TransactionSortValue.fineAmount}
              </MenuItem>
              <MenuItem value={TransactionSortValue.checkedoutOn}>
                {TransactionSortValue.checkedoutOn}
              </MenuItem>
              <MenuItem value={TransactionSortValue.reservedOn}>
                {TransactionSortValue.reservedOn}
              </MenuItem>
              <MenuItem value={TransactionSortValue.returnedOn}>
                {TransactionSortValue.returnedOn}
              </MenuItem>
              {/* {Object.keys(TransactionSortValue).map((key, index) => (
                <MenuItem value={key} key={index}>
                  {
                    TransactionSortValue[
                      key as keyof typeof TransactionSortValue
                    ]
                  }
                </MenuItem>
              ))} */}
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
          <Box className={clsx(classes.searchInputWrap, "searchInputWrap")}>
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
            <CheckoutItem key={index} checkoutItem={item} />
          ))}
        </Box>
      </Box>
    </>
  );
};
