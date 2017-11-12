export const DATA_LOADING = "DATA_LOADING";
export const DATA_SAVING = "DATA_SAVING";
export const DATA_ERROR = "DATA_ERROR";

export const POST_LOADED = "POST_LOADED";
export const POSTS_LOADED = "POSTS_LOADED";
export const POST_SAVED = "POST_SAVED";

export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const VOTE_POST_UP = "VOTE_POST_UP";
export const VOTE_POST_DOWN = "VOTE_POST_DOWN";

export const COMMENTS_LOADED = "COMMENTS_LOADED";
export const COMMENT_SAVED = "COMMENT_SAVED";

export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const VOTE_COMMENT_UP = "VOTE_COMMENT_UP";
export const VOTE_COMMENT_DOWN = "VOTE_COMMENT_DOWN";

export const CATEGORIES_LOADED = "CATEGORIES_LOADED";

function indexedById(collection) {
  return collection.reduce(
    (obj, val) => ({ ...obj, [val.id]: { ...val } }),
    {}
  );
}

export function dataLoading(isLoading) {
  return {
    type: DATA_LOADING,
    isLoading
  };
}

export function dataError(message) {
  return {
    type: DATA_ERROR,
    errorOccurred: true,
    message
  };
}

export function postsLoaded(posts) {
  posts.forEach(post => fetchComments(post));
  return {
    type: POSTS_LOADED,
    posts: indexedById(posts)
  };
}

export function postLoaded(post) {
  return {
    type: POST_LOADED,
    post: post
  };
}

export function fetchPost(page) {
  return dispatch => {
    dispatch(dataLoading(true));

    fetch(`http://localhost:3001/posts/${page}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(dataLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(post => {
        dispatch(postLoaded(post));
        dispatch(fetchComments(post));
      })
      .catch(reason => dispatch(dataError(reason)));
  };
}

export function fetchPosts() {
  return dispatch => {
    dispatch(dataLoading(true));

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
        dispatch(dataLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(postsLoaded(posts)))
      .catch(reason => dispatch(dataError(reason)));
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

export function fetchComments(post) {
  return dispatch => {
    dispatch(dataLoading(true));
    fetch(`http://localhost:3001/posts/${post.id}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(dataLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(comments => dispatch(commentsLoaded(comments)))
      .catch(reason => dispatch(dataError(reason)));
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

export function commentsLoaded(comments) {
  return {
    type: COMMENTS_LOADED,
    comments: indexedById(comments)
  };
}

export function categoriesLoaded(categories) {
  return {
    type: CATEGORIES_LOADED,
    categories
  };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(dataLoading(true));
    fetch("http://localhost:3001/categories", {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error("Unable to load categories");
        }

        dispatch(dataLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(categories => {
        dispatch(categoriesLoaded(categories.categories));
        dispatch(fetchPosts());
      })
      .catch(reason => dispatch(dataError(reason)));
  };
}
