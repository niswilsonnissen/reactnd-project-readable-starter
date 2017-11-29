import * as types from "./types";

export function dataLoading(isLoading) {
  return {
    type: types.DATA_LOADING,
    isLoading
  };
}

export function dataLoadError(message) {
  return {
    type: types.DATA_LOAD_ERROR,
    errorOccurred: true,
    message
  };
}

export function clearDataLoadError() {
  return {
    type: types.DATA_LOAD_ERROR,
    errorOccurred: false,
    message: null
  };
}

export function dataSaving(isSaving) {
  return {
    type: types.DATA_SAVING,
    isSaving
  };
}

export function dataSaveError(message) {
  return {
    type: types.DATA_SAVE_ERROR,
    errorOccurred: true,
    message
  };
}

export function clearDataSaveError() {
  return {
    type: types.DATA_SAVE_ERROR,
    errorOccurred: false,
    message: null
  };
}

export function postsLoaded(posts) {
  return {
    type: types.POSTS_LOADED,
    posts
  };
}

export function postLoaded(post) {
  return {
    type: types.POST_LOADED,
    post
  };
}

export function fetchPost(page) {
  return dispatch => {
    dispatch(dataLoading(true));
    return fetch(`http://localhost:3001/posts/${page}`, {
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
        if (!post.id) {
          return dispatch(postLoaded({ id: page, deleted: true }));
        }
        return dispatch(postLoaded(post));
      })
      .catch(reason => dispatch(dataLoadError(reason)));
  };
}

export function fetchPosts() {
  return dispatch => {
    dispatch(dataLoading(true));
    return fetch("http://localhost:3001/posts", {
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
      .catch(reason => dispatch(dataLoadError(reason)));
  };
}

export function addPost(post) {
  return dispatch => {
    dispatch(dataSaving(true));
    return fetch("http://localhost:3001/posts", {
      method: "post",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...post
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dataLoading(false);
        return response;
      })
      .then(response => response.json())
      .then(post => dispatch(postLoaded(post)))
      .catch(reason => dispatch(dataSaveError(reason)));
  };
}

export function updatePost(post) {
  return dispatch => {
    dispatch(dataSaving(true));
    return fetch(`http://localhost:3001/posts/${post.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: post.title,
        body: post.body
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(dataSaving(false));
        return response;
      })
      .then(response => response.json())
      .then(post => dispatch(postLoaded(post)))
      .then(reason => dispatch(dataSaveError(reason)));
  };
}

export function deletePost(post) {
  return dispatch => {
    dispatch(dataSaving(true));
    return fetch(`http://localhost:3001/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(dataSaving(false));
        return response;
      })
      .then(response => response.json())
      .then(post => {
        dispatch(postLoaded(post));
        return dispatch(fetchComments(post));
      })
      .catch(reason => dispatch(dataSaveError(reason)));
  };
}

// ==== Voting on posts ====
export const votePostUp = voteOnPost("upVote");
export const votePostDown = voteOnPost("downVote");

function voteOnPost(type) {
  return ({ id }) => {
    return dispatch => {
      dispatch(dataSaving(true));
      fetch(`http://localhost:3001/posts/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa("user:pass")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          option: type
        })
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          dispatch(dataSaving(false));
          return response;
        })
        .then(response => response.json())
        .then(post => dispatch(postLoaded(post)))
        .catch(reason => dispatch(dataSaveError(reason)));
    };
  };
}
// ==========================

export function fetchComments(post) {
  return dispatch => {
    dispatch(dataLoading(true));
    return fetch(`http://localhost:3001/posts/${post.id}/comments`, {
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
      .catch(reason => dispatch(dataLoadError(reason)));
  };
}

export function addComment(comment) {
  return dispatch => {
    dispatch(dataSaving(true));
    return fetch("http://localhost:3001/comments", {
      method: "post",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dataSaving(false);
        return response;
      })
      .then(response => response.json())
      .then(comment => dispatch(commentLoaded(comment)))
      .catch(reason => dispatch(dataSaveError(reason)));
  };
}

export function updateComment(comment) {
  return dispatch => {
    dispatch(dataSaving(true));
    return fetch(`http://localhost:3001/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body: comment.body,
        timestamp: comment.timestamp
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(dataSaving(false));
        return response;
      })
      .then(response => response.json())
      .then(comment => dispatch(commentLoaded(comment)))
      .catch(reason => dispatch(dataSaveError(reason)));
  };
}

export function deleteComment(comment) {
  return dispatch => {
    dispatch(dataSaving(true));
    return fetch(`http://localhost:3001/comments/${comment.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${btoa("user:pass")}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(dataSaving(false));
        return response;
      })
      .then(response => response.json())
      .then(comment => dispatch(commentLoaded(comment)))
      .catch(reason => dispatch(dataSaveError(reason)));
  };
}

export function commentLoaded(comment) {
  return {
    type: types.COMMENT_LOADED,
    comment
  };
}

export function commentsLoaded(comments) {
  return {
    type: types.COMMENTS_LOADED,
    comments
  };
}

/* ==== Voting on comments ==== */
export const voteCommentUp = voteOnComment("upVote");
export const voteCommentDown = voteOnComment("downVote");

function voteOnComment(type) {
  return ({ id }) => {
    return dispatch => {
      dispatch(dataSaving(true));
      return fetch(`http://localhost:3001/comments/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa("user:pass")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          option: type
        })
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          dispatch(dataSaving(false));
          return response;
        })
        .then(response => response.json())
        .then(comment => dispatch(commentLoaded(comment)))
        .catch(reason => dispatch(dataSaveError(reason)));
    };
  };
}
/* ============================ */

export function categoriesLoaded(categories) {
  return {
    type: types.CATEGORIES_LOADED,
    categories: categories
  };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(dataLoading(true));
    return fetch("http://localhost:3001/categories", {
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
      .then(categories => dispatch(categoriesLoaded(categories.categories)))
      .catch(reason => dispatch(dataLoadError(reason)));
  };
}
