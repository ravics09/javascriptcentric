import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
  AuthReducer,
  UserReducer
});
export default rootReducer;
