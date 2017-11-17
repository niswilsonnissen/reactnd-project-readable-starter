import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import series from "async/series";
import queryString from "query-string";

import {
  votePostUp,
  votePostDown,
  deletePost,
  fetchCategories,
  fetchPosts,
  fetchComments
} from "../actions";
import { capitalize, formatDate } from "../utils/helpers";
import { descending } from "../utils/orderBy";

import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import FilterBar from "./FilterBar";
import CategoryList from "./CategoryList";

class CategoryView extends Component {
  orderByOptions = {
    timestamp: descending("timestamp"),
    voteScore: descending("voteScore")
  };

  componentDidMount() {
    const { fetchCategories, fetchPosts, fetchComments } = this.props;
    fetchCategories().then(() => {
      fetchPosts().then(() => {
        series(
          this.props.posts.map(post => {
            return done => {
              fetchComments(post).then(() => done());
            };
          })
        );
      });
    });
  }

  render() {
    const {
      categories,
      posts,
      category,
      votePostUp,
      votePostDown,
      deletePost,
      location
    } = this.props;
    const { orderBy } = queryString.parse(location.search);
    let sortedPosts = [...posts].sort(
      this.orderByOptions[orderBy || "voteScore"]
    );

    if (!category) {
      return (
        <div className="container">
          <em>Loading ...</em>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="posts">
          <h2>Category: {capitalize(category.name)}</h2>
          <FilterBar orderBy={orderBy} />
          {sortedPosts.map(post => {
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
                    {formatDate(post.timestamp)}, comments:{" "}
                    {post.comments.length}
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
    fetchCategories: data => dispatch(fetchCategories(data)),
    fetchPosts: data => dispatch(fetchPosts(data)),
    fetchComments: data => dispatch(fetchComments(data)),
    votePostUp: data => dispatch(votePostUp(data)),
    votePostDown: data => dispatch(votePostDown(data)),
    deletePost: data => dispatch(deletePost(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
);
