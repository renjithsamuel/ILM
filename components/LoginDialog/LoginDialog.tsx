import { Tooltip } from "@material-ui/core";
import {
  Box,
  Button,
  Dialog,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useLoginDialogStyles } from "./LoginDialog.styles";
import { themeValues } from "@/constants/ThemeConstants";
import { IBookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { UserBookDetailType } from "@/constants/GlobalConstants";
import { useLoginDialog } from "./LoginDialog.hooks";
import theme from "@/styles/theme";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEye } from "react-icons/io5";
import { Role } from "@/constants/Role";

interface loginDialogParams {}

export const LoginDialog = ({}: loginDialogParams) => {
  const {
    isLogin,
    fullScreen,
    openDialog,
    handleCloseDialog,
    handleSwitchLoginRegister,
    initialValues,
    validationSchema,
    isVisible,
    handleSubmit,
    handlePasswordVisiblity,
  } = useLoginDialog({});
  const classes = useLoginDialogStyles();
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        // onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        {/* register */}
        <Box className={classes.loginWrap}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: themeValues.font.fontWeightThick,
              userSelect: "none",
            }}
          >
            {!isLogin ? "Please Register" : "Please Login"}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            style={{ width: "30vw" }}
          >
            {/* login */}
            {isLogin
              ? ({ errors, touched, isValid }: any) => (
                  <Form
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Field
                      className={classes.textField}
                      as={TextField}
                      label="Email"
                      name="email"
                      fullWidth
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      className={classes.textField}
                      as={TextField}
                      label="Password"
                      name="password"
                      type={!isVisible ? "password" : "text"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                            onClick={handlePasswordVisiblity}
                          >
                            {isVisible ? <AiFillEyeInvisible /> : <IoEye />}
                          </InputAdornment>
                        ),
                      }}
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      fullWidth
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.loginButton}
                      disabled={!isValid}
                    >
                      Login
                    </Button>
                  </Form>
                )
              : // register
                ({ errors, touched, isValid }: any) => (
                  <Form
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    {RegisterParams.map((param) => (
                      <>
                        {param.keyForDB === "role" ? (
                          <>
                            <Field
                              className={classes.textField}
                              as={TextField}
                              label="Role"
                              name="role"
                              fullWidth
                              select
                              error={touched.role && !!errors.role}
                              helperText={touched.role && errors.role}
                            >
                              <MenuItem value={Role.Librarian}>
                                {Role.Librarian}
                              </MenuItem>
                              <MenuItem value={Role.Patrons}>
                                {Role.Patrons}
                              </MenuItem>
                            </Field>
                          </>
                        ) : param.keyForDB === "password" ? (
                          <Field
                            className={classes.textField}
                            as={TextField}
                            label={param.inputPlaceHolder}
                            name={param.keyForDB}
                            type={!isVisible ? param.inputType : "text"}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  sx={{
                                    "&:hover": {
                                      cursor: "pointer",
                                    },
                                  }}
                                  onClick={handlePasswordVisiblity}
                                >
                                  {isVisible ? (
                                    <AiFillEyeInvisible />
                                  ) : (
                                    <IoEye />
                                  )}
                                </InputAdornment>
                              ),
                            }}
                            fullWidth
                            error={
                              touched[param.keyForDB] &&
                              !!errors[param.keyForDB]
                            }
                            helperText={
                              touched[param.keyForDB] && errors[param.keyForDB]
                            }
                          />
                        ) : (
                          <Field
                            className={classes.textField}
                            as={TextField}
                            label={param.inputPlaceHolder}
                            name={param.keyForDB}
                            type={param.inputType}
                            fullWidth
                            error={
                              touched[param.keyForDB] &&
                              !!errors[param.keyForDB]
                            }
                            helperText={
                              touched[param.keyForDB] && errors[param.keyForDB]
                            }
                          />
                        )}
                      </>
                    ))}
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.loginButton}
                      disabled={!isValid}
                    >
                      Signup
                    </Button>
                  </Form>
                )}
          </Formik>
          <Typography
            variant="body1"
            className={classes.switcher}
            onClick={handleSwitchLoginRegister}
            sx={{ userSelect: "none" }}
          >
            {isLogin ? "Don't have an Account?" : "Already Registered?"}
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export const RegisterParams = [
  {
    keyForDB: "name",
    inputLabel: "username : ",
    inputPlaceHolder: "Username",
    inputType: "text",
  },
  {
    keyForDB: "email",
    inputLabel: "email : ",
    inputPlaceHolder: "Email",
    inputType: "email",
  },
  {
    keyForDB: "role",
    inputLabel: "role : ",
    inputPlaceHolder: " Role  ",
    inputType: "text",
  },
  {
    keyForDB: "password",
    inputLabel: "Password : ",
    inputPlaceHolder: "Password",
    inputType: "password",
  },
];
