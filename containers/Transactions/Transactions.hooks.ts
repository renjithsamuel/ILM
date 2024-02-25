import {
  SortOrder,
  TransactionSortValue,
  globalConstants,
} from "@/constants/GlobalConstants";
import { mockBooks } from "@/entity/Book/Book.mock";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { mockCheckoutTickets } from "@/entity/CheckoutTicket/CheckoutTicket.mock";
import { mockUsers } from "@/entity/User/User.mock";
import { debounce } from "@/utils/debounce";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface transactionsHookProps {}

interface transactionsHook {
  checkedOutList: CheckoutTicket[];
  sortByOrder: SortOrder;
  sortByValue: TransactionSortValue;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
  handleSearch: (val: string) => void;
  searchText: string;
}

export const useTransactions =
  ({}: transactionsHookProps): transactionsHook => {
    const router = useRouter();
    const [checkedOutList, setCheckedOutList] = useState<CheckoutTicket[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [sortByValue, setSortByValue] = useState<TransactionSortValue>(
      TransactionSortValue.reservedOn
    );
    const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);

    // can come from single book page direct search here
    useEffect(() => {
      if (router.asPath) {
        const querySearchText = router.asPath.split("?")[1];
        console.log(router.asPath);
        if (querySearchText) {
          setSearchText(querySearchText);
        }
      }
    }, [router.asPath]);

    const handleSortValue = (event: SelectChangeEvent): void => {
      event.target.value &&
        setSortByValue(event.target.value as TransactionSortValue);
    };
    const handleSortOrder = (event: SelectChangeEvent): void => {
      event.target.value && setSortByOrder(event.target.value as SortOrder);
    };

    const handleSearch = (value: any) => {
      setSearchText(value);
    };

    useEffect(() => {
      let tempCheckoutList: CheckoutTicket[] = mockCheckoutTickets;
      tempCheckoutList = tempCheckoutList.map((item) => {
        item.user = mockUsers.find((user) => user.userID === item.userID);
        item.book = mockBooks.find((book) => book.ID === item.bookID);
        return item;
      });
      tempCheckoutList && setCheckedOutList(tempCheckoutList);
    }, []);

    return {
      checkedOutList,
      searchText,
      sortByOrder,
      sortByValue,
      handleSortOrder,
      handleSortValue,
      handleSearch,
    };
  };
