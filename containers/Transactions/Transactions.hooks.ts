import { useGetAllCheckoutsAPI } from "@/goconnection/Checkout/getAllCheckouts";
import {
  SortOrder,
  TransactionSortValue,
  globalConstants,
} from "@/constants/GlobalConstants";
import { usePageContext } from "@/context/PageContext";
import { CheckoutTicket } from "@/entity/CheckoutTicket/CheckoutTicket";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface transactionsHookProps {}

interface transactionsHook {
  checkedOutList: CheckoutTicket[] | undefined;
  sortByOrder: SortOrder;
  sortByValue: TransactionSortValue;
  pageNumber: number;
  rowsPerPage: number;
  totalPages: number;
  isTicketLoading: boolean;
  handleRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handlePageNumber: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number,
  ) => void;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
  handleSearch: (val: string) => void;
  searchText: string;
}

export const useTransactions =
  ({}: transactionsHookProps): transactionsHook => {
    const router = useRouter();

    // pagination related
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const { setSnackBarError } = usePageContext();
    const [searchText, setSearchText] = useState<string>("");
    const [sortByValue, setSortByValue] = useState<TransactionSortValue>(
      TransactionSortValue.fineAmount,
    );
    const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);

    const {
      data: ticketsData,
      isError: isTicketError,
      isLoading: isTicketLoading,
    } = useGetAllCheckoutsAPI({
      orderBy: sortByOrder,
      sortBy: sortByValue,
      limit: rowsPerPage,
      page: pageNumber,
    });

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

    // pagination
    const handleRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
      if (event.target.value) {
        setRowsPerPage(Number.parseInt(event.target.value, 10));
        setPageNumber(1); // Reset page number when rows per page changes
      }
    };

    const handlePageNumber = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      val: number,
    ): void => {
      if (val) {
        setPageNumber(val);
      }
    };

    return {
      checkedOutList: ticketsData?.data.checkoutTickets,
      totalPages: ticketsData?.data.totalPages ?? -1,
      searchText,
      sortByOrder,
      sortByValue,
      pageNumber,
      rowsPerPage,
      isTicketLoading,
      handleRowsPerPage,
      handlePageNumber,
      handleSortOrder,
      handleSortValue,
      handleSearch,
    };
  };
