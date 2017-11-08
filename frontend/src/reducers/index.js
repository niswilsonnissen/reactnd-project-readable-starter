import { combineReducers } from "redux";
import {
  POSTS_LOADING,
  POSTS_ERROR,
  POSTS_LOADED,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  VOTE_POST_UP,
  VOTE_POST_DOWN,
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT_UP,
  VOTE_COMMENT_DOWN
} from "../actions";

const initialCategoriesState = [
  {
    name: "react",
    path: "react"
  },
  {
    name: "redux",
    path: "redux"
  },
  {
    name: "udacity",
    path: "udacity"
  }
];

function categories(state = initialCategoriesState, action) {
  return state;
}

const initialPostsState = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1467166872634,
    title: "Udacity is the best place to learn React",
    body: "Everyone says so after all.",
    author: "thingtwo",
    category: "react",
    voteScore: 6,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1468479767190,
    title: "Learn Redux in 10 minutes!",
    body: "Just kidding. It takes more than 10 minutes to learn technology.",
    author: "thingone",
    category: "redux",
    voteScore: -5,
    deleted: false
  }
};

function posts(state = initialPostsState, action) {
  const { posts, post } = action;

  switch (action.type) {
    case POSTS_LOADING:
      return state;
    case POSTS_LOADED:
      return {
        ...posts
      };
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
    case VOTE_POST_UP:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          voteScore: state[post.id].voteScore + 1
        }
      };
    case VOTE_POST_DOWN:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          voteScore: state[post.id].voteScore - 1
        }
      };
    default:
      return state;
  }
}

const initialCommentsState = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: "894tuq4ut84ut8v4t8wun89g",
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: "Hi there! I am a COMMENT.",
    author: "thingtwo",
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: "8tu4bsun805n8un48ve89",
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: "Comments. Are. Cool.",
    author: "thingone",
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
};

function comments(state = initialCommentsState, action) {
  const { comment } = action;
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...comment
        }
      };
    case DELETE_COMMENT:
      const deletedComment = {
        ...state[comment.id],
        deleted: true
      };
      return {
        ...state,
        [comment.id]: deletedComment
      };
    case VOTE_COMMENT_UP:
      return {
        ...state,
        [comment.id]: {
          ...state[comment.id],
          voteScore: state[comment.id].voteScore + 1
        }
      };
    case VOTE_COMMENT_DOWN:
      return {
        ...state,
        [comment.id]: {
          ...state[comment.id],
          voteScore: state[comment.id].voteScore - 1
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments
});
