export interface IReview {
  ID: string;
  bookID: string;
  checkoutID: string;
  userID: string;
  commentHeading: string;
  comment: string;
  rating: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Review implements IReview {
  ID: string;
  bookID: string;
  checkoutID: string;
  userID: string;
  commentHeading: string;
  comment: string;
  rating: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(review: IReview) {
    this.ID = review.ID;
    this.bookID = review.bookID;
    this.checkoutID = review.checkoutID;
    this.userID = review.userID;
    this.commentHeading = review.commentHeading;
    this.comment = review.comment;
    this.rating = review.rating;
    this.likes = review.likes;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
  }
}
