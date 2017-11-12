import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPost } from "../actions";
import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import CommentForm from "./CommentForm";
import { formatDate } from "../utils/helpers";

import {
  votePostUp,
  votePostDown,
  deletePost,
  deleteComment,
  voteCommentUp,
  voteCommentDown
} from "../actions";

class PostDetail extends Component {
  handleDeletePost = post => {
    const { history, deletePost } = this.props;
    deletePost(post);
    history.push("/");
  };

  componentDidMount() {
    this.props.fetchPost(this.props.page);
  }

  render() {
    const {
      isLoading,
      post,
      votePostUp,
      votePostDown,
      deleteComment,
      voteCommentUp,
      voteCommentDown
    } = this.props;

    if (isLoading || !post) {
      return <p>Loading post ...</p>;
    }

    const { comments } = post;
    return (
      <div className="post-detail">
        <div className="post">
          <Voting
            id={post.id}
            voteScore={post.voteScore}
            voteUp={votePostUp}
            voteDown={votePostDown}
          />
          <div className="content">
            <h3>{post.title}</h3>
            <div className="post-info">
              by {post.author}
              {formatDate(post.timestamp)}, comments: {comments.length}
            </div>
            <div className="post-body">{post.body}</div>
            <div className="post-comments">
              <h4>
                {comments.length}{" "}
                {comments.length === 1 ? "comment" : "comments"}
              </h4>
              <ol>
                {comments.map(comment => (
                  <li key={comment.id}>
                    <div className="comment">
                      <Voting
                        id={comment.id}
                        voteScore={comment.voteScore}
                        voteUp={voteCommentUp}
                        voteDown={voteCommentDown}
                      />
                      <div className="content">
                        <div className="comment-body">{comment.body}</div>
                        <div className="comment-info">by {comment.author}</div>
                      </div>
                      <AdminButtons
                        name="comment"
                        id={comment.id}
                        onDeleteClick={deleteComment}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <CommentForm parentId={post.id} />
          </div>
          <AdminButtons
            name="post"
            id={post.id}
            onDeleteClick={this.handleDeletePost}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const postId = ownProps.page;
  const post =
    typeof state.posts[postId] !== "undefined" ? state.posts[postId] : null;

  if (post) {
    const comments = Object.values(state.comments).filter(
      comment => comment.parentId === postId && !comment.deleted
    );
    const category = state.categories.find(
      category => category.name === post.category
    );
    return {
      isLoading: state.data.isLoading,
      post: {
        ...post,
        comments,
        category
      }
    };
  }
  return {
    isLoading: state.data.isLoading,
    post: null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: data => dispatch(fetchPost(data)),
    votePostUp: data => dispatch(votePostUp(data)),
    votePostDown: data => dispatch(votePostDown(data)),
    deletePost: data => dispatch(deletePost(data)),
    deleteComment: data => dispatch(deleteComment(data)),
    voteCommentUp: data => dispatch(voteCommentUp(data)),
    voteCommentDown: data => dispatch(voteCommentDown(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);
