import { usePageContext } from "@/context/PageContext";
import { BoardData } from "@/entity/BoardData/boardData";
import { useGetBoardDataAPI } from "@/goconnection/Dashboard/getBoardData";
import { useEffect } from "react";

interface dashboardDataBoardHookProps {}

interface dashboardDataBoardHook {
  boardData: BoardData | undefined;
}

export const useDashboardDataBoard =
  ({}: dashboardDataBoardHookProps): dashboardDataBoardHook => {
    const { setSnackBarError } = usePageContext();
    const { data: boardDataResponse, isError: isBoardDataError } =
      useGetBoardDataAPI();

    useEffect(() => {
      if (isBoardDataError) {
        setSnackBarError({
          ErrorMessage: "fetch data failed!",
          ErrorSeverity: "error",
        });
      }
    }, [isBoardDataError]);

    return {
      boardData: boardDataResponse?.data,
    };
  };
