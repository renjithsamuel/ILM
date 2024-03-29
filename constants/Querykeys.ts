export enum QueryKeys {
  // user related
  GET_USER = "GET_USER",
  GET_USER_BY_ID = "GET_USER_BY_ID",
  GET_USERS = "GET_USERS",
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  UPDATE_USER = "UPDATE_USER",
  GET_TOKEN_EXPIRY = "GET_TOKEN_EXPIRY",
  // book related
  GET_BOOK = "GET_BOOK",
  UPDATE_BOOK = "UPDATE_BOOK",
  GET_ALL_BOOKS = "GET_ALL_BOOKS",
  GET_ALL_BOOKS_FROM_BOOK_DETAILS = "GET_ALL_BOOKS_FROM_BOOK_DETAILS",
  GET_ALL_BOOKS_FROM_SPECIFIC_LIST = "GET_ALL_BOOKS_FROM_SPECIFIC_LIST",
  GET_ALL_NEW_BOOKS_GOOGLE = "GET_ALL_NEW_BOOKS_GOOGLE",
  GET_SIMILAR_BOOKS = "GET_SIMILAR_BOOKS",
  // checkout related
  CREATE_CHECKOUT = "CREATE_CHECKOUT",
  GET_ALL_CHECKOUTS = "GET_ALL_CHECKOUTS",
  GET_CHECKOUT_WITH_USERID = "GET_CHECKOUT_WITH_USERID",
  GET_CHECKOUT_BY_ID = "GET_CHECKOUT_BY_ID",
  // Review Related
  GET_REVIEW = "GET_REVIEW",
  GET_REVIEWS = "GET_REVIEWS",
  // Search Related
  SEARCH_DIALOG = "SEARCH_DIALOG",
  // dashboard related
  GET_LINE_GRAPH_DATA = "GET_LINE_GRAPH_DATA",
  GET_DATA_BOARD = "GET_DATA_BOARD",
  GET_HIGH_DEMAND = "GET_HIGH_DEMAND",
  // data analysis related
  GET_RECOMMENDED_BOOKS = "GET_RECOMMENDED_BOOKS",
  GET_APPROXIMATE_DEMAND = "GET_APPROXIMATE_DEMAND",
}
