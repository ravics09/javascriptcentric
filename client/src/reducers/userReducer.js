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
} from "./../actions/types";

const readingData = JSON.parse(localStorage.getItem("readingList"));
const initialState = readingData
  ? {
      readingList: readingData,
    }
  : { readingList: [] };

const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_READING_LIST_SUCCESS:
      console.log("payload to add", payload);
      return {
        ...state,
        readingList: payload,
      };

    case ADD_TO_READING_LIST_FAILED:
      return {
        ...state,
      };

    case REMOVE_FROM_READING_LIST_SUCCESS:
      return {
        ...state,
        readingList: payload,
      };

    case REMOVE_FROM_READING_LIST_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default UserReducer;
