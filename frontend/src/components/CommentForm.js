import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, updateComment } from "../actions";
import uuidv1 from "uuid/v1";

class CommentForm extends Component {
  state = {
    body: "",
    author: "",
    isEditing: false
  };

  componentDidMount() {
    if (this.props.commentToEdit) {
      const { body, author } = this.props.commentToEdit;
      this.setState({
        body,
        author,
        isEditing: true
      });
    } else {
      this.setState({
        body: "",
        author: "",
        isEditing: false
      });
    }
  }

  handleSaveComment = e => {
    e.preventDefault();
    const {
      parentId,
      addComment,
      updateComment,
      commentToEdit,
      onCommentSave
    } = this.props;
    const { body, author } = this.state;
    const saveComment = commentToEdit ? updateComment : addComment;
    const commentData = commentToEdit
      ? { ...commentToEdit, ...this.state, timestamp: Date.now() }
      : {
          id: uuidv1(),
          timestamp: Date.now(),
          parentId,
          body,
          author
        };
    saveComment(commentData).then(action => {
      this.setState({
        body: "",
        author: ""
      });
      if (typeof onCommentSave === "function") {
        onCommentSave(action.comment);
      }
    });
  };

  render() {
    const { body, author, isEditing } = this.state;

    return (
      <form className="post-comment-form">
        <h4>{isEditing ? "Edit comment" : "Add new comment"}</h4>
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
            disabled={this.state.isEditing}
          />
        </div>
        <div className="group">
          <button className="btn" onClick={this.handleSaveComment}>
            {isEditing ? "Save comment" : "Add comment"}
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
    addComment: data => dispatch(addComment(data)),
    updateComment: data => dispatch(updateComment(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentForm)
);
