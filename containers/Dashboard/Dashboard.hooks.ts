import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";

interface dashboardHookProps {}

interface dashboardHook {
  highDemandBooks : Book[],
}

export const useDashboard =
  ({}: dashboardHookProps): dashboardHook => {

    const highDemandBooks  = mockBooks;
    return {
      highDemandBooks,
    };
  };
