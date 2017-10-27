import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as uuid from "uuid";
import { addPost } from "../actions";

class PostForm extends Component {
  state = {
    category: "react",
    title: "",
    body: "",
    author: ""
  };

  handleAddPost = e => {
    e.preventDefault();
    const newPost = {
      ...this.state,
      id: uuid.v1()
    };
    this.props.addPost(newPost);
  };

  render() {
    const { category, title, body, author } = this.state;

    return (
      <form className="post-form">
        <h2>Add new post</h2>
        <div className="group">
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            defaultValue={category}
            onChange={e => this.setState({ category: e.target.value })}
          >
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </select>
        </div>
        <div className="group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <div className="group">
          <label htmlFor="body">Body:</label>
          <textarea
            name="body"
            id="body"
            style={{ height: 80 + "px" }}
            value={this.state.body}
            onChange={e => this.setState({ body: e.target.value })}
          />
        </div>
        <div className="group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            value={this.state.author}
            onChange={e => this.setState({ author: e.target.value })}
          />
        </div>
        <div className="group">
          <button className="btn" onClick={this.handleAddPost}>
            Save post
          </button>{" "}
          or <Link to="/">cancel</Link>
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
    addPost: data => dispatch(addPost(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostForm)
);
