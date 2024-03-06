import { Review } from "./Review";

export const mockReview: Review = {
  ID: "3e74718b-3855-43ba-ae2c-4be8ccc79037",
  bookID: "3e74718b-3855-43ba-ae2c-4be8ccc79027",
  checkoutID: "123456",
  userID: "123456",
  commentHeading:
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. , sunt in culpa qui officia deserunt mollit anim id est laborum. ",
  rating: 4.1,
  likes: 50,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockReviews: Review[] = [mockReview, mockReview];
