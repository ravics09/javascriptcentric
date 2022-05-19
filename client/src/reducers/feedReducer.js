import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILED,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILED,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
  ADD_TO_LIKED_BY_SUCCESS,
  ADD_TO_LIKED_BY_FAILED,
  REMOVE_FROM_LIKED_BY_SUCCESS,
  REMOVE_FROM_LIKED_BY_FAILED,
} from "./../actions/types";

const likedByData = JSON.parse(localStorage.getItem("likedByList"));
const initialState = likedByData
  ? {
      likedByList: likedByData,
    }
  : { likedByList: [] };

const FeedReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_LIKED_BY_SUCCESS:
      return {
        ...state,
        likedByList: payload,
      };

    case ADD_TO_LIKED_BY_FAILED:
      return {
        ...state,
      };

    case REMOVE_FROM_LIKED_BY_SUCCESS:
      return {
        ...state,
        likedByList: payload,
      };

    case REMOVE_FROM_LIKED_BY_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default FeedReducer;
