import { useLoginUserAPI } from "@/goconnection/User/loginUser";
import { useRegisterUserAPI } from "@/goconnection/User/registerUser";
import { usePageContext } from "@/context/PageContext";
import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { UserLogin, UserRegister } from "@/types/UserLogin";
import { Cookie } from "@/utils/cookies";
import { createLoginValidation } from "@/validations/loginValidation";
import { createRegisterValidation } from "@/validations/registerValidation";
import { useMediaQuery, useTheme } from "@mui/material";
import { ErrorMessage } from "formik";
import { useEffect, useReducer, useState } from "react";
import { AnySchema } from "yup";

interface loginDialogHookProps {}

interface loginDialogHook {
  fullScreen: boolean;
  openDialog: boolean;
  isLogin: boolean;
  initialValues: Object;
  validationSchema: AnySchema;
  isVisible: boolean;
  handleCloseDialog: () => void;
  handleSwitchLoginRegister: () => void;
  handleSubmit: (values: any) => Promise<void>;
  handlePasswordVisiblity: () => void;
}

export const useLoginDialog = ({}: loginDialogHookProps): loginDialogHook => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);

  const {
    mutateAsync: loginUser,
    isLoading: isLoginError,
    isSuccess: isLoginSuccess,
  } = useLoginUserAPI();

  const {
    mutateAsync: registerUser,
    isLoading: isRegisterError,
    isSuccess: isRegisterSuccess,
  } = useRegisterUserAPI();

  const { setSnackBarError } = usePageContext();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSwitchLoginRegister = () => {
    setIsLogin(!isLogin);
  };

  // login relater validation and formik
  const initialValues = isLogin
    ? {
        email: "",
        password: "",
      }
    : {
        name: "",
        email: "",
        role: "",
        password: "",
      };

  const validationSchema = isLogin
    ? createLoginValidation()
    : createRegisterValidation();

  // login or register submit
  const handleSubmit = async (values: any) => {
    if (isLogin) {
      const response = await loginUser({ user: values });
      if (response.data.token) Cookie.access_token = response.data.token;
    } else {
      const registerResponse = await registerUser({ user: values });
      if (registerResponse.status === 409) {
        setSnackBarError({
          ErrorMessage: "user already exists",
          ErrorSeverity: "error",
        });
        return;
      }
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      handleCloseDialog();
      setSnackBarError({
        ErrorMessage: "login success",
        ErrorSeverity: "success",
      });
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isRegisterSuccess) {
      setIsLogin(true);
      setSnackBarError({
        ErrorMessage: "register success, please login",
        ErrorSeverity: "success",
      });
    }
  }, [isRegisterSuccess]);

  useEffect(() => {
    if (isLoginError) {
      setSnackBarError({
        ErrorMessage: "login failed",
        ErrorSeverity: "error",
      });
      return;
    }
    if (isRegisterError) {
      setSnackBarError({
        ErrorMessage: "register failed",
        ErrorSeverity: "error",
      });
    }
  }, [isLoginError, isRegisterError]);

  const handlePasswordVisiblity = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  };

  return {
    isLogin,
    fullScreen,
    openDialog,
    initialValues,
    validationSchema,
    isVisible,
    handleCloseDialog,
    handleSwitchLoginRegister,
    handleSubmit,
    handlePasswordVisiblity,
  };
};
