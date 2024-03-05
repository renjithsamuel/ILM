import { CheckoutTicket } from "./CheckoutTicket";

export const mockCheckoutTicket: CheckoutTicket = {
  userID: "123456",
  bookID: "3e74718b-3855-43ba-ae2c-4be8ccc79027",
  isCheckedOut: true,
  isReturned: false,
  numberOfDays: 15,
  fineAmount: 0,
  reservatedOn: new Date(),
  checkedOutOn: new Date(),
  returnedDate: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockCheckoutTickets: CheckoutTicket[] = [
  mockCheckoutTicket,
  {
    ...mockCheckoutTicket,
    isCheckedOut: true,
    isReturned: false,
    numberOfDays: 15,
    fineAmount: 10,
  },
  {
    ...mockCheckoutTicket,
    isCheckedOut: true,
    isReturned: true,
    numberOfDays: 15,
    fineAmount: 0,
  },
  {
    ...mockCheckoutTicket,
    isCheckedOut: false,
    isReturned: false,
    numberOfDays: 15,
    fineAmount: 0,
  },
];
