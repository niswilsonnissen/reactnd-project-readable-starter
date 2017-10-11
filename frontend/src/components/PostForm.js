import React, { Component } from "react";
import { Link } from "react-router-dom";

class PostForm extends Component {
  render() {
    return (
      <form className="post-form">
        <h2>Add new post</h2>
        <div className="group">
          <label>Category:</label>
          <select name="category" id="category">
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </select>
        </div>
        <div className="group">
          <label>Title:</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="group">
          <label>Body:</label>
          <textarea name="body" id="body" style={{ height: 80 + "px" }} />
        </div>
        <div className="group">
          <label>Author:</label>
          <input type="text" name="author" id="author" />
        </div>
        <div className="group">
          <button className="btn">Save post</button> or{" "}
          <Link to="/">cancel</Link>
        </div>
      </form>
    );
  }
}

export default PostForm;
