import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { votePostUp, votePostDown, deletePost } from "../actions";
import { capitalize } from "../utils/helpers";

import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import FilterBar from "./FilterBar";
import CategoryList from "./CategoryList";

class CategoryView extends Component {
  render() {
    const {
      categories,
      posts,
      category,
      votePostUp,
      votePostDown,
      deletePost
    } = this.props;

    return (
      <div className="container">
        <div className="posts">
          <h2>Category: {capitalize(category.name)}</h2>
          <FilterBar />
          {posts.map(post => {
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
                    posted by: {post.author}, comments: {post.comments.length}
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
                <strong>There are no posts in this category</strong>
              </em>
            </div>
          )}
        </div>
        <CategoryList categories={categories} showFrontpage={true} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    category: state.categories.find(
      category => category.name === ownProps.category
    ),
    categories: state.categories,
    posts: Object.values(state.posts)
      .filter(post => post.category === ownProps.category && !post.deleted)
      .map(post => ({
        ...post,
        comments: Object.values(state.comments).filter(
          comment => comment.parentId === post.id && !comment.deleted
        )
      }))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    votePostUp: data => dispatch(votePostUp(data)),
    votePostDown: data => dispatch(votePostDown(data)),
    deletePost: data => dispatch(deletePost(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
);
