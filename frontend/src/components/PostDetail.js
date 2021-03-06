import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import { fetchCategories, fetchPost, fetchComments } from "../actions";
import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import CommentForm from "./CommentForm";
import { formatDate } from "../utils/helpers";
import { descending } from "../utils/orderBy";

import {
  votePostUp,
  votePostDown,
  deletePost,
  deleteComment,
  voteCommentUp,
  voteCommentDown
} from "../actions";

class PostDetail extends Component {
  state = {
    showEditComment: false,
    commentToEdit: null
  };

  handleEditPost = post => {
    const { history } = this.props;
    history.push(`/posts/${post.id}/edit`);
  };

  handleDeletePost = post => {
    const { history, deletePost } = this.props;
    deletePost(post);
    history.push("/");
  };

  handleEditComment = comment => {
    const commentToEdit = this.props.post.comments.find(
      c => c.id === comment.id
    );
    this.setState({ showEditComment: true, commentToEdit });
  };

  handleRequestClose = e => {
    this.setState({ showEditComment: false, commentToEdit: null });
  };

  handleCommentUpdated = e => {
    this.handleRequestClose();
  };

  componentDidMount() {
    const { fetchCategories, fetchPost, fetchComments, page } = this.props;
    fetchCategories().then(() => {
      fetchPost(page).then(() => {
        const { post } = this.props;
        if (post && !post.deleted) {
          fetchComments(post);
        }
      });
    });
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
      return (
        <div style={{ textAlign: "center", padding: "32px" }}>
          <p>Loading post ...</p>
        </div>
      );
    }

    if (post.deleted) {
      return (
        <div style={{ textAlign: "center", padding: "32px" }}>
          <strong>Post not found!</strong>
        </div>
      );
    }

    let sortedComments = [...post.comments];
    sortedComments.sort(descending("voteScore"));
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
              in{" "}
              <Link to={`/${post.category.path}/`}>{post.category.name}</Link>{" "}
              by {post.author}
              {formatDate(post.timestamp)}, comments: {sortedComments.length}
            </div>
            <div className="post-body">{post.body}</div>
            <div className="post-comments">
              <h4>
                {sortedComments.length}{" "}
                {sortedComments.length === 1 ? "comment" : "comments"}
              </h4>
              <ol>
                {sortedComments.map(comment => (
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
                        onEditClick={this.handleEditComment}
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
            onEditClick={this.handleEditPost}
            onDeleteClick={this.handleDeletePost}
          />
        </div>
        <ReactModal
          isOpen={this.state.showEditComment}
          shouldCloseOnEsc={true}
          onRequestClose={this.handleRequestClose}
        >
          <div style={{ textAlign: "right" }}>
            <button type="button" onClick={this.handleRequestClose}>
              Close
            </button>
          </div>
          <CommentForm
            parentId={post.id}
            commentToEdit={this.state.commentToEdit}
            onCommentSave={this.handleCommentUpdated}
          />
        </ReactModal>
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
    fetchCategories: data => dispatch(fetchCategories(data)),
    fetchPost: data => dispatch(fetchPost(data)),
    fetchComments: data => dispatch(fetchComments(data)),
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
