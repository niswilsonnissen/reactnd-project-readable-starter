import React, { Component } from "react";
import series from "async/series";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import queryString from "query-string";

import {
  votePostUp,
  votePostDown,
  deletePost,
  fetchCategories,
  fetchPosts,
  fetchComments
} from "../actions";

import { formatDate } from "../utils/helpers";
import { descending } from "../utils/orderBy";

import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import FilterBar from "./FilterBar";
import CategoryList from "./CategoryList";

class MainView extends Component {
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
      votePostUp,
      votePostDown,
      deletePost,
      location
    } = this.props;
    const { orderBy } = queryString.parse(location.search);
    let sortedPosts = [...posts].sort(this.orderByOptions[orderBy]);
    return (
      <div className="container">
        <div className="posts">
          <FilterBar orderBy={orderBy} />
          {sortedPosts.map(post => {
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
    fetchPosts: data => dispatch(fetchPosts(data)),
    fetchComments: data => dispatch(fetchComments(data)),
    votePostUp: data => dispatch(votePostUp(data)),
    votePostDown: data => dispatch(votePostDown(data)),
    deletePost: data => dispatch(deletePost(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainView)
);
