import * as Yup from "yup";

export const createCommentValidation = (): Yup.AnySchema =>
  Yup.object().shape({
    commentHeading: Yup.string()
      .required("Heading is required")
      .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces")
      .min(10, "Must be atleast 10 characters")
      .max(50, "Must be less than 50 characters"),
    comment: Yup.string()
      .required("Comment is required")
      .min(20, "Must be atleast 20 characters")
      .max(600, "Must be less than 600 characters"),
  });
