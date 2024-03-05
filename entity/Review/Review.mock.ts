import { Review } from "./Review";

export const mockReview: Review = {
  ID: "3e74718b-3855-43ba-ae2c-4be8ccc79037",
  bookID: "3e74718b-3855-43ba-ae2c-4be8ccc79027",
  checkoutID: "123456",
  userID: "123456",
  commentHeading: "someting",
  comment: "someting",
  rating: 4.1,
  likes: 50,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockReviews: Review[] = [mockReview, mockReview];
