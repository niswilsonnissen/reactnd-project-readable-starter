import { combineReducers } from "redux";
import {
  DATA_LOADING,
  DATA_SAVING,
  DATA_ERROR,
  POST_LOADED,
  POSTS_LOADED,
  COMMENT_LOADED,
  COMMENTS_LOADED,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  CATEGORIES_LOADED
} from "../actions";

const initialCategoriesState = [];

function categories(state = initialCategoriesState, action) {
  switch (action.type) {
    case CATEGORIES_LOADED:
      const { categories } = action;
      return categories;
    default:
      return state;
  }
}

const initialPostsState = {};

function posts(state = initialPostsState, action) {
  const { posts, post } = action;
  switch (action.type) {
    case POST_LOADED:
      return {
        ...state,
        [post.id]: {
          ...post
        }
      };
    case POSTS_LOADED:
      let newState = {
        ...state
      };
      posts.forEach(post => {
        newState[post.id] = {
          ...post
        };
      });
      return newState;
    case ADD_POST:
      return {
        ...state,
        [post.id]: {
          ...post
        }
      };
    case UPDATE_POST:
      return {
        ...state,
        [post.id]: {
          ...post
        }
      };
    case DELETE_POST:
      const deletedPost = {
        ...state[post.id],
        deleted: true
      };
      return {
        ...state,
        [post.id]: deletedPost
      };
    default:
      return state;
  }
}

const initialCommentsState = {};

function comments(state = initialCommentsState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment
        }
      };
    case DELETE_COMMENT:
      const deletedComment = {
        ...state[action.comment.id],
        deleted: true
      };
      return {
        ...state,
        [action.comment.id]: deletedComment
      };
    case COMMENT_LOADED:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment
        }
      };
    case COMMENTS_LOADED:
      let newState = {};
      Object.keys(state).forEach(id => {
        newState[id] = { ...state[id] };
      });
      action.comments.forEach(comment => {
        newState[comment.id] = { ...comment };
      });
      return newState;
    default:
      return state;
  }
}

const initialDataState = {
  isLoading: false,
  isSaving: false,
  errorOccurred: false,
  errorMessage: null
};

function data(state = initialDataState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case DATA_SAVING:
      return {
        ...state,
        isSaving: action.isSaving
      };
    case DATA_ERROR:
      return {
        ...state,
        errorOccurred: true,
        errorMessage: action.message
      };
    default:
      return state;
  }
}

export default combineReducers({
  data,
  categories,
  posts,
  comments
});
