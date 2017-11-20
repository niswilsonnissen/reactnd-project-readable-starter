import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import { addPost, fetchCategories } from "../actions";
import { capitalize } from "../utils/helpers";

class PostForm extends Component {
  state = {
    category: "react",
    title: "",
    body: "",
    author: ""
  };

  handleAddPost = e => {
    e.preventDefault();
    const { history, categories, addPost } = this.props;
    const newPost = {
      ...this.state,
      id: uuidv1(),
      timestamp: Date.now(),
      voteScore: 1,
      deleted: false
    };
    addPost(newPost).then(() => {
      const category = categories.find(c => c.name === newPost.category);
      this.setState({
        category: "react",
        title: "",
        body: "",
        author: ""
      });
      history.push(`/${category.path}/${newPost.id}`);
    });
  };

  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  render() {
    const { categories } = this.props;
    const { category, title, body, author } = this.state;

    return (
      <form className="post-form">
        <h2>Add new post</h2>
        <div className="group">
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={e => this.setState({ category: e.target.value })}
          >
            {categories.map(c => (
              <option key={c.path} value={c.path}>
                {capitalize(c.name)}
              </option>
            ))}
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
            value={body}
            onChange={e => this.setState({ body: e.target.value })}
          />
        </div>
        <div className="group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
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
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data)),
    addPost: data => dispatch(addPost(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostForm)
);
