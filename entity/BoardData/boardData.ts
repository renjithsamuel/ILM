export interface IBoardData {
  usersCount: number;
  booksCount: number;
  checkoutsCount: number;
  revenueAmount: number;
  monthlyNewBooksAddedCount: number;
  monthlyNewRegisteredUserCount: number;
  monthlyNewCheckoutTicketsCount: number;
  monthlyFineAmountTotal: number;
}

export class BoardData implements IBoardData {
  usersCount: number;
  booksCount: number;
  checkoutsCount: number;
  revenueAmount: number;
  monthlyNewBooksAddedCount: number;
  monthlyNewRegisteredUserCount: number;
  monthlyNewCheckoutTicketsCount: number;
  monthlyFineAmountTotal: number;

  constructor(boardData: IBoardData) {
    this.usersCount = boardData.usersCount;
    this.booksCount = boardData.booksCount;
    this.checkoutsCount = boardData.checkoutsCount;
    this.revenueAmount = boardData.revenueAmount;
    this.monthlyNewBooksAddedCount = boardData.monthlyNewBooksAddedCount;
    this.monthlyNewRegisteredUserCount =
      boardData.monthlyNewRegisteredUserCount;
    this.monthlyNewCheckoutTicketsCount =
      boardData.monthlyNewCheckoutTicketsCount;
    this.monthlyFineAmountTotal = boardData.monthlyFineAmountTotal;
  }
}
