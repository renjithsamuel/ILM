export type CreateReview = {
  bookID: string;
  checkoutID: string;
  userID: string;
  commentHeading: string;
  comment: string;
  rating: number;
};
