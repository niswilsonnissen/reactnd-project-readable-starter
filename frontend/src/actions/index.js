export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const VOTE_POST_UP = "VOTE_POST_UP";
export const VOTE_POST_DOWN = "VOTE_POST_DOWN";

export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const VOTE_COMMENT_UP = "VOTE_COMMENT_UP";
export const VOTE_COMMENT_DOWN = "VOTE_COMMENT_DOWN";

export function addPost({ id, category, author, title, body }) {
  return {
    type: ADD_POST,
    id,
    category,
    author,
    title,
    body,
    timestamp: Date.now(),
    voteScore: 1,
    deleted: false
  };
}

export function updatePost({ id, category, author, title, body }) {
  return {
    type: UPDATE_POST,
    id,
    category,
    author,
    title,
    body
  };
}

export function deletePost({ id }) {
  return {
    type: DELETE_POST,
    id,
    deleted: true
  };
}

export function votePostUp({ id }) {
  return {
    type: VOTE_POST_UP,
    post: {
      id
    }
  };
}

export function votePostDown({ id }) {
  return {
    type: VOTE_POST_DOWN,
    post: {
      id
    }
  };
}
