import { useGetAllUsersAPI } from "@/api/User/getAllUsers";
import { SortOrder, UserBookDetailType } from "@/constants/GlobalConstants";
import { Role } from "@/constants/Role";
import { usePageContext } from "@/context/PageContext";
import { User } from "@/entity/User/User";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface allUsersHookProps {}

interface allUsersHook {
  pendingUsers: User[];
  sortByValue: UserBookDetailType;
  sortByOrder: SortOrder;
  totalPages: number;
  pageNumber: number;
  rowsPerPage: number;
  handleRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePageNumber: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ) => void;
  handleSortOrder: (event: SelectChangeEvent) => void;
  handleSortValue: (event: SelectChangeEvent) => void;
}

export const useAllUsers = ({}: allUsersHookProps): allUsersHook => {
  const { setSnackBarError } = usePageContext();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  // pagination related
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [sortByValue, setSortByValue] = useState<UserBookDetailType>(
    UserBookDetailType.WishLists
  );
  const [sortByOrder, setSortByOrder] = useState<SortOrder>(SortOrder.asc);

  // fetch users
  const {
    data: pendingUsersData,
    isSuccess: isPendingUsersSuccess,
    isError: isPendingUsersError,
    isLoading: isPendingUsersLoading,
  } = useGetAllUsersAPI({
    orderBy: sortByOrder,
    sortBy: sortByValue,
    limit: rowsPerPage,
    page: pageNumber,
  });

  useMemo(() => {
    if (!!pendingUsersData?.data.users) {
      setPendingUsers(pendingUsersData?.data.users);
    }
  }, [pendingUsersData?.data.users]);

  // sorting
  const handleSortValue = (event: SelectChangeEvent): void => {
    event.target.value &&
      setSortByValue(event.target.value as UserBookDetailType);
  };
  const handleSortOrder = (event: SelectChangeEvent): void => {
    event.target.value && setSortByOrder(event.target.value as SortOrder);
  };

  // pagination
  const handleRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (event.target.value) {
      setRowsPerPage(Number.parseInt(event.target.value, 10));
      setPageNumber(1); // Reset page number when rows per page changes
    }
  };

  const handlePageNumber = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    val: number
  ): void => {
    if (val) {
      setPageNumber(val);
    }
  };

  useEffect(() => {
    if (isPendingUsersError) {
      setSnackBarError({
        ErrorMessage: "get users failed!",
        ErrorSeverity: "error",
      });
    }
  }, [isPendingUsersError]);

  return {
    pendingUsers,
    // pendingUsers: mockUserMock,
    totalPages: pendingUsersData?.data.totalPages ?? -1,
    sortByValue,
    sortByOrder,
    pageNumber,
    rowsPerPage,
    handleRowsPerPage,
    handlePageNumber,
    handleSortValue,
    handleSortOrder,
  };
};
