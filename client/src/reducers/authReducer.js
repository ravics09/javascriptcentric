import {
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    SIGNOUT_SUCCESS,
    GOOGLE_SIGNIN_SUCCESS,
    FORGOT_PASSWORD_SUCCESS
  } from "../actions/types";
  const loggedInUser = JSON.parse(localStorage.getItem("User"));
  
  const initialState = loggedInUser
    ? { isLoggedIn: true, loggedInUser }
    : { isLoggedIn: false, loggedInUser: null };
  
  const AuthReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case SIGNIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          loggedInUser: payload.user,
        };
  
      case SIGNIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          loggedInUser: null,
        };
  
      case GOOGLE_SIGNIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          loggedInUser: payload.user,
        };
  
      case SIGNOUT_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
          loggedInUser: null,
        };

        case FORGOT_PASSWORD_SUCCESS:
          return {
            ...state,
            isLoggedIn: false,
            loggedInUser: null,
          };
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  