import { useGetAllCheckoutsAPI } from "@/api/Checkout/getAllCheckouts";
import {
  SortOrder,
  TransactionSortValue,
  globalConstants,
} from "@/constants/GlobalConstants";
import { usePageContext } from "@/context/PageContext";
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
  checkedOutList: CheckoutTicket[] | undefined;
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
    const { setSnackBarError } = usePageContext();
    const [searchText, setSearchText] = useState<string>("");
    const [sortByValue, setSortByValue] = useState<TransactionSortValue>(
      TransactionSortValue.fineAmount
    );
    const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);

    const { data: ticketsData, isError: isTicketError } =
      useGetAllCheckoutsAPI();

    console.log("ticketsData", ticketsData?.data);

    useEffect(() => {
      if (isTicketError) {
        setSnackBarError({
          ErrorMessage: "get checkout tickets failed",
          ErrorSeverity: "error",
        });
        return;
      }
    }, [isTicketError]);

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

    return {
      checkedOutList: ticketsData?.data,
      searchText,
      sortByOrder,
      sortByValue,
      handleSortOrder,
      handleSortValue,
      handleSearch,
    };
  };
