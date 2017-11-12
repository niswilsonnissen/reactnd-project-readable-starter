import React, { Component } from "react";
import {
  votePostUp,
  votePostDown,
  deletePost,
  fetchCategories
} from "../actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import FilterBar from "./FilterBar";
import CategoryList from "./CategoryList";

class MainView extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { posts, categories } = this.props;
    const { votePostUp, votePostDown, deletePost } = this.props;

    return (
      <div className="container">
        <div className="posts">
          <FilterBar />
          {posts.map(post => {
            const { category, comments } = post;
            return (
              <div key={post.id} className="post">
                <Voting
                  id={post.id}
                  voteScore={post.voteScore}
                  voteUp={votePostUp}
                  voteDown={votePostDown}
                />
                <div className="content">
                  <h3>
                    <Link to={`/${category.path}/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <div className="post-info">
                    posted by: {post.author}
                    {formatDate(post.timestamp)}, comments: {comments.length}
                  </div>
                </div>
                <AdminButtons
                  name="post"
                  id={post.id}
                  onDeleteClick={deletePost}
                />
              </div>
            );
          })}
          {posts.length === 0 && (
            <div style={{ textAlign: "center", padding: "16px" }}>
              <em style={{ color: "#777" }}>
                <strong>There are no posts</strong>
              </em>
            </div>
          )}
        </div>
        <CategoryList categories={categories} showFrontpage={false} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: Object.values(state.posts)
      .filter(post => !post.deleted)
      .map(post => ({
        ...post,
        comments: Object.values(state.comments).filter(
          comment => comment.parentId === post.id && !comment.deleted
        ),
        category: state.categories.find(
          category => category.name === post.category
        )
      })),
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data)),
    votePostUp: data => dispatch(votePostUp(data)),
    votePostDown: data => dispatch(votePostDown(data)),
    deletePost: data => dispatch(deletePost(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainView)
);
