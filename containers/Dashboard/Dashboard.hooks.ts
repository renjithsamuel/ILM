import { usePageContext } from "@/context/PageContext";
import { Book } from "@/entity/Book/Book";
import { useGetHighDemandBooksAPI } from "@/goconnection/Dashboard/getHighDemandBooks";
import { useEffect, useState } from "react";

interface dashboardHookProps {}

interface dashboardHook {
  highDemandBooks: Book[];
}

export const useDashboard = ({}: dashboardHookProps): dashboardHook => {
  const { setSnackBarError } = usePageContext();
  const [highDemandBooks, setHighDemandBooks] = useState<Book[]>([]);
  const {
    data: highDemandResponse,
    isError: isHighDemandError,
    isSuccess: isHighDemandSuccess,
  } = useGetHighDemandBooksAPI();

  useEffect(() => {
    if (isHighDemandError) {
      setSnackBarError({
        ErrorMessage: "fetch book failed!",
        ErrorSeverity: "error",
      });
    }
  }, [isHighDemandError]);

  console.log("highDemandResponse.data", highDemandResponse?.data);

  useEffect(() => {
    if (isHighDemandSuccess && highDemandResponse.data) {
      setHighDemandBooks(highDemandResponse.data);
    }
  }, [isHighDemandSuccess]);

  return {
    highDemandBooks,
  };
};
