import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import CommentForm from "./CommentForm";

import { votePostUp, votePostDown } from "../actions";

class PostDetail extends Component {
  render() {
    const { posts, comments, votePostUp, votePostDown } = this.props;

    const post = posts[this.props.page];

    const postComments = Object.values(comments).filter(
      c => c.parentId === post.id && !c.deleted && !c.parentDeleted
    );

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
              by {post.author}, comments: {postComments.length}
            </div>
            <div className="post-body">{post.body}</div>
            <div className="post-comments">
              <h4>
                {postComments.length}{" "}
                {postComments.length === 1 ? "comment" : "comments"}
              </h4>
              <ol>
                {postComments.map(comment => (
                  <li key={comment.id}>
                    <div className="comment">
                      <Voting id={comment.id} voteScore={comment.voteScore} />
                      <div className="content">
                        <div className="comment-body">{comment.body}</div>
                        <div className="comment-info">by {comment.author}</div>
                      </div>
                      <AdminButtons name="comment" />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <CommentForm parentId={post.id} />
          </div>
          <AdminButtons name="post" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    votePostUp: data => dispatch(votePostUp(data)),
    votePostDown: data => dispatch(votePostDown(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);
