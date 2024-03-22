import dayjs from "dayjs";
import * as Yup from "yup";

export const createRegisterValidation = (): Yup.AnySchema =>
  Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces")
      .required("Name is required"),
    role: Yup.string()
      .oneOf(
        ["librarian", "patrons"],
        "Role must be either librarian or patron"
      )
      .required("Role is required"),
    // dateOfBirth: Yup.date()
    //   .required("Date of Birth is required")
    //   .test(
    //     "is-of-legal-age",
    //     "You must be 18 years or older.",
    //     function (value) {
    //       if (value) {
    //         const currentDate = dayjs();
    //         const minAgeDate = currentDate.subtract(18, "year");
    //         return dayjs(value).isBefore(minAgeDate);
    //       }
    //       return false;
    //     }
    //   ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password : Yup.string()
    .required("Password is required")
    .min(8, "Must be more than 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      "Password must contain at least one capital, small and special character"
    )
  });
