import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import CommentForm from "./CommentForm";

import {
  votePostUp,
  votePostDown,
  deletePost,
  deleteComment
} from "../actions";

class PostDetail extends Component {
  handleDeletePost = post => {
    const { history, deletePost } = this.props;
    deletePost(post);
    history.push("/");
  };
  render() {
    const { post, votePostUp, votePostDown, deleteComment } = this.props;
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
              by {post.author}, comments: {comments.length}
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
                      <Voting id={comment.id} voteScore={comment.voteScore} />
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
  const post = state.posts[ownProps.page];
  return {
    post: {
      ...post,
      comments: Object.values(state.comments).filter(
        comment => comment.parentId === post.id && !comment.deleted
      ),
      category: state.categories.find(
        category => category.name === post.category
      )
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    votePostUp: data => dispatch(votePostUp(data)),
    votePostDown: data => dispatch(votePostDown(data)),
    deletePost: data => dispatch(deletePost(data)),
    deleteComment: data => dispatch(deleteComment(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);
