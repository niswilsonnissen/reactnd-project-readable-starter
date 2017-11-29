import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import { addPost, updatePost, fetchCategories, fetchPost } from "../actions";
import { capitalize } from "../utils/helpers";

class PostForm extends Component {
  state = {
    category: "react",
    title: "",
    body: "",
    author: ""
  };

  handleSavePost = e => {
    e.preventDefault();
    const { history, categories, addPost, updatePost, post } = this.props;
    const savePost = post ? updatePost : addPost;
    const postData = post
      ? { ...post, ...this.state }
      : {
          ...this.state,
          id: uuidv1(),
          timestamp: Date.now(),
          voteScore: 1,
          deleted: false
        };
    savePost(postData).then(() => {
      const category = categories.find(c => c.name === postData.category);
      this.setState({
        category: "react",
        title: "",
        body: "",
        author: ""
      });
      history.push(`/${category.path}/${postData.id}`);
    });
  };

  componentDidMount() {
    const { fetchCategories, fetchPost, page } = this.props;
    if (page) {
      fetchCategories().then(() => {
        fetchPost(page).then(action => {
          this.setState({
            category: action.post.category,
            title: action.post.title,
            body: action.post.body,
            author: action.post.author
          });
        });
      });
    } else {
      fetchCategories();
    }
  }

  render() {
    const { categories, isEditing } = this.props;
    const { category, title, body, author } = this.state;

    return (
      <form className="post-form">
        <h2>{isEditing ? "Edit post" : "Add new post"}</h2>
        <div className="group">
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={e => this.setState({ category: e.target.value })}
            disabled={isEditing}
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
            disabled={isEditing}
          />
        </div>
        <div className="group">
          <button className="btn" onClick={this.handleSavePost}>
            Save post
          </button>{" "}
          or <Link to="/">cancel</Link>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const postId = ownProps.page;
  const post =
    typeof state.posts[postId] !== "undefined" ? state.posts[postId] : null;

  if (post) {
    const category = state.categories.find(
      category => category.name === post.category
    );
    return {
      isLoading: state.data.isLoading,
      isEditing: true,
      categories: state.categories,
      post: {
        ...post,
        category
      }
    };
  }
  return {
    isLoading: state.data.isLoading,
    isEditing: false,
    categories: state.categories,
    post: null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data)),
    fetchPost: data => dispatch(fetchPost(data)),
    addPost: data => dispatch(addPost(data)),
    updatePost: data => dispatch(updatePost(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostForm)
);
