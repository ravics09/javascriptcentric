import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import UserReducer from "./userReducer";
import FeedReducer from "./feedReducer";

const rootReducer = combineReducers({
  AuthReducer,
  UserReducer,
  FeedReducer
});
export default rootReducer;
