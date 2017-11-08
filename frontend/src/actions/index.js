export const POSTS_LOADING = "POSTS_LOADING";
export const POSTS_SAVING = "POSTS_SAVING";
export const POSTS_ERROR = "POSTS_ERROR";
export const POSTS_LOADED = "POSTS_LOADED";
export const POSTS_SAVED = "POSTS_SAVED";

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

export function postsLoading(isLoading) {
  return {
    type: POSTS_LOADING,
    isLoading
  };
}

export function postsError(message) {
  return {
    type: POSTS_ERROR,
    errorOccurred: true,
    message
  };
}

export function postsLoaded(posts) {
  const postsIndexed = posts.reduce(
    (obj, val) => ({ ...obj, [val.id]: { ...val } }),
    {}
  );
  return {
    type: POSTS_LOADED,
    posts: postsIndexed
  };
}

export function fetchPosts() {
  return dispatch => {
    dispatch(postsLoading(true));
    fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(postsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(postsLoaded(posts)))
      .catch(reason => dispatch(postsError(reason)));
  };
}

export function addPost({ id, category, author, title, body }) {
  return {
    type: ADD_POST,
    post: {
      id,
      category,
      author,
      title,
      body,
      timestamp: Date.now(),
      voteScore: 1,
      deleted: false
    }
  };
}

export function updatePost({ id, category, author, title, body }) {
  return {
    type: UPDATE_POST,
    post: {
      id,
      category,
      author,
      title,
      body
    }
  };
}

export function deletePost({ id }) {
  return {
    type: DELETE_POST,
    post: {
      id
    }
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

export function addComment({ id, parentId, body, author }) {
  return {
    type: ADD_COMMENT,
    comment: {
      id,
      parentId,
      timestamp: Date.now(),
      body,
      author,
      voteScore: 0,
      deleted: false,
      parentDeleted: false
    }
  };
}

export function deleteComment({ id }) {
  return {
    type: DELETE_COMMENT,
    comment: {
      id
    }
  };
}

export function voteCommentUp({ id }) {
  return {
    type: VOTE_COMMENT_UP,
    comment: {
      id
    }
  };
}

export function voteCommentDown({ id }) {
  return {
    type: VOTE_COMMENT_DOWN,
    comment: {
      id
    }
  };
}
