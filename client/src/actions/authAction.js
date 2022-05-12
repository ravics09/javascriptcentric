import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS, GOOGLE_SIGNIN_SUCCESS, FORGOT_PASSWORD_SUCCESS } from "./types";
import AuthService from "../services/authService";

export const signin = (user) => async (dispatch) => {
  return AuthService.signIn(user).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: { user: response.user },
      });

      Promise.resolve();
      return response;
    } else if (response.status === "failed") {
      Promise.resolve();
      return response;
    }
  });
};

export const googlesignin = (user) => async (dispatch) => {
  return AuthService.googleSignIn(user).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: GOOGLE_SIGNIN_SUCCESS,
        payload: { user: response.user },
      });

      Promise.resolve();
      return response;
    } else if (response.status === "failed") {
      Promise.resolve();
      return response;
    }
  });
};

export const signout = () => async (dispatch) => {
  return AuthService.signOut().then((response) => {
    if (response.status === "success") {
      dispatch({
        type: SIGNOUT_SUCCESS,
      });

      Promise.resolve();
      return response;
    }
  });
};

export const forgotpassword = (payload) => async (dispatch) => {
  return AuthService.forgotPassword(payload).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS
      });

      Promise.resolve();
      return response;
    } else if (response.status === "failed") {
      Promise.resolve();
      return response;
    }
  });
}
