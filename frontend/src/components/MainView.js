import React, { Component } from "react";
import { votePostUp, votePostDown } from "../actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import FilterBar from "./FilterBar";
import CategoryList from "./CategoryList";

class MainView extends Component {
  render() {
    const { posts, categories, comments } = this.props;
    const { votePostUp, votePostDown } = this.props;

    return (
      <div className="container">
        <div className="posts">
          <FilterBar />
          {Object.keys(posts).map(key => {
            const post = posts[key];
            const category = categories.find(cat => cat.name === post.category);
            const postComments = Object.values(comments).filter(
              com => com.parentId === post.id
            );
            return (
              <div key={key} className="post">
                <Voting
                  id={post.id}
                  voteScore={post.voteScore}
                  voteUp={votePostUp}
                  voteDown={votePostDown}
                />
                <div className="content">
                  <h3>
                    <Link to={`/${category.path}/${key}`}>{post.title}</Link>
                  </h3>
                  <div className="post-info">
                    posted by: {post.author}, comments: {postComments.length}
                  </div>
                </div>
                <AdminButtons name="post" />
              </div>
            );
          })}
        </div>
        <CategoryList categories={categories} showFrontpage={false} />
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
  connect(mapStateToProps, mapDispatchToProps)(MainView)
);
