import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
  EDIT_PROFILE_PHOTO_SUCCESS,
  EDIT_PROFILE_PHOTO_FAILED,
  ADD_TO_READING_LIST_SUCCESS,
  ADD_TO_READING_LIST_FAILED,
  REMOVE_FROM_READING_LIST_SUCCESS,
  REMOVE_FROM_READING_LIST_FAILED,
  FETCH_READINGLIST_SUCCESS,
  FETCH_READINGLIST_FAILED,
  DELETE_FROM_READINGLIST_SUCCESS,
  DELETE_FROM_READINGLIST_FAILED,
} from "./types";

import UserService from "./../services/userService";

export const addtoreadinglist = (id, postId) => async (dispatch) => {
  return UserService.addToReadingList(id, postId).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: ADD_TO_READING_LIST_SUCCESS,
        payload: response.updatedReadingList,
      });

      Promise.resolve();
      return response;
    } else if (response.status === "failed") {
      dispatch({
        type: ADD_TO_READING_LIST_FAILED,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const removefromreadinglist = (id, postId) => async (dispatch) => {
  return UserService.removeFromReadingList(id, postId).then((response) => {
    if (response.status === "success") {
      dispatch({
        type: REMOVE_FROM_READING_LIST_SUCCESS,
        payload: response.updatedReadingList
      });

      Promise.resolve();
      return response;
    } else if (response.status === "failed") {
      dispatch({
        type: REMOVE_FROM_READING_LIST_FAILED,
      });
      Promise.resolve();
      return response;
    }
  });
};
