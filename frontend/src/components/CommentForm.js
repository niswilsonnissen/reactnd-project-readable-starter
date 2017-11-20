import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment } from "../actions";
import uuidv1 from "uuid/v1";

class CommentForm extends Component {
  state = {
    body: "",
    author: ""
  };

  handleAddComment = e => {
    e.preventDefault();
    const { parentId, addComment } = this.props;
    const { body, author } = this.state;
    const newComment = {
      id: uuidv1(),
      timestamp: Date.now(),
      parentId,
      body,
      author
    };
    addComment(newComment);
    this.setState({
      body: "",
      author: ""
    });
  };

  render() {
    const { body, author } = this.state;

    return (
      <form className="post-comment-form">
        <h4>Add new comment</h4>
        <div className="group">
          <textarea
            name="body"
            id="body"
            placeholder="Write comment ..."
            value={body}
            onChange={e => this.setState({ body: e.target.value })}
          />
        </div>
        <div className="group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Type your username"
            value={author}
            onChange={e => this.setState({ author: e.target.value })}
          />
        </div>
        <div className="group">
          <button className="btn" onClick={this.handleAddComment}>
            Add comment
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: data => dispatch(addComment(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentForm)
);
