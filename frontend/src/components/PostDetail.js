import React, { Component } from "react";

class PostDetail extends Component {
  render() {
    const posts = {
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
        body:
          "Just kidding. It takes more than 10 minutes to learn technology.",
        author: "thingone",
        category: "redux",
        voteScore: -5,
        deleted: false
      }
    };

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
        <div className="voting">
          <button>Up</button>
          <button>Down</button>
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail-info">
          by {post.author}, current score: {post.voteScore}
        </div>
        <div className="post-detail-body">{post.body}</div>
        <div className="post-admin">
          <button>Edit post</button>
          <button>Delete post</button>
        </div>
        <div className="post-detail-comments">
          <h2>
            {postComments.length}{" "}
            {postComments.length === 1 ? "comment" : "comments"}
          </h2>
          <ol>
            {postComments.map(comment => (
              <li key={comment.id}>
                <div className="comment-detail">
                  <div className="voting">
                    <button>Up</button>
                    <button>Down</button>
                  </div>
                  <div className="comment-detail-body">{comment.body}</div>
                  <div className="comment-detail-info">
                    by {comment.author}, current score: {comment.voteScore}
                  </div>
                  <div className="admin">
                    <button>Edit comment</button>
                    <button>Delete comment</button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <form className="post-details-comment-form">
          <h3>Add new comment</h3>
          <div className="group">
            <textarea placeholder="Write comment ..." />
          </div>
          <div className="group">
            <input type="text" placeholder="Type your username" />
          </div>
          <div className="group">
            <button>Add comment</button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostDetail;
