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
  ADD_TO_READING_LIST_SUCCESS,
  ADD_TO_READING_LIST_FAILED,
  ADD_TO_LIKED_BY_SUCCESS,
  ADD_TO_LIKED_BY_FAILED,
  REMOVE_FROM_LIKED_BY_SUCCESS,
  REMOVE_FROM_LIKED_BY_FAILED,
} from "./types";
import FeedService from "./../services/feedService";

export const addtolikedby = (postId, userId) => async (dispatch) => {
  return FeedService.addToLikedBy(postId, userId).then((response) => {
    if (response.status === "success") {
      console.log("res at addtolikedby", response);
      dispatch({
        type: ADD_TO_LIKED_BY_SUCCESS,
        payload: response.updatedLikedBy,
      });

      Promise.resolve();
      return response;
    } else if (response.status === "failed") {
      dispatch({
        type: ADD_TO_LIKED_BY_FAILED,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const removefromlikedby = (postId, userId) => async (dispatch) => {
  return FeedService.removeFromLikedBy(postId, userId).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: REMOVE_FROM_LIKED_BY_SUCCESS,
        payload: response.updatedLikedBy,
      });

      Promise.resolve();
      return response;
    } else if (response.status === "failed") {
      dispatch({
        type: REMOVE_FROM_LIKED_BY_FAILED,
      });
      Promise.resolve();
      return response;
    }
  });
};
