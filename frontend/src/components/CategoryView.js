import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { votePostUp, votePostDown } from "../actions";
import { capitalize } from "../utils/helpers";

import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import FilterBar from "./FilterBar";
import CategoryList from "./CategoryList";

class CategoryView extends Component {
  render() {
    const { categories, posts, votePostUp, votePostDown } = this.props;

    const category = categories.find(c => c.path === this.props.category);

    const categoryPosts = Object.values(posts).filter(
      p => p.category === category.name
    );

    return (
      <div className="container">
        <div className="posts">
          <h2>Category: {capitalize(category.name)}</h2>
          <FilterBar />
          {categoryPosts.map(post => {
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
                    posted by: {post.author}, comments: XYZ
                  </div>
                </div>
                <AdminButtons name="post" />
              </div>
            );
          })}
        </div>
        <CategoryList categories={categories} showFrontpage={true} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    votePostUp: data => dispatch(votePostUp(data)),
    votePostDown: data => dispatch(votePostDown(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
);
