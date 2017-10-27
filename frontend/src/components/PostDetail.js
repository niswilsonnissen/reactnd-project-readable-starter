import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import { votePostUp, votePostDown } from "../actions";

class PostDetail extends Component {
  render() {
    const { posts, votePostUp, votePostDown } = this.props;

    const post = posts[this.props.page];

    const comments = {
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
            <form className="post-comment-form">
              <h4>Add new comment</h4>
              <div className="group">
                <textarea placeholder="Write comment ..." />
              </div>
              <div className="group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Type your username"
                />
              </div>
              <div className="group">
                <button className="btn">Add comment</button>
              </div>
            </form>
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
