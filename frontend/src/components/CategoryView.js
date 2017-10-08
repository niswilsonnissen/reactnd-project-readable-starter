import React, { Component } from "react";
import Voting from "./Voting";
import AdminButtons from "./AdminButtons";
import FilterBar from "./FilterBar";

class CategoryView extends Component {
  render() {
    const categories = [
      {
        name: "react",
        path: "react"
      },
      {
        name: "redux",
        path: "redux"
      },
      {
        name: "udacity",
        path: "udacity"
      }
    ];

    const category = categories.find(c => c.path === this.props.category);

    const posts = {
      "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1467166872634,
        title: "Udacity is the best place to learn React",
        body: "Everyone says so after all.",
        author: "thingtwo",
        category: "react",
        voteScore: 6,
        deleted: false
      },
      "6ni6ok3ym7mf1p33lnez": {
        id: "6ni6ok3ym7mf1p33lnez",
        timestamp: 1468479767190,
        title: "Learn Redux in 10 minutes!",
        body:
          "Just kidding. It takes more than 10 minutes to learn technology.",
        author: "thingone",
        category: "redux",
        voteScore: -5,
        deleted: false
      }
    };

    const categoryPosts = Object.values(posts).filter(
      p => p.category === category.name
    );

    return (
      <div class="container">
        <div className="posts">
          <h2>Category: {category.name}</h2>
          <FilterBar />
          {categoryPosts.map(post => {
            return (
              <div key={post.id} className="post">
                <Voting voteScore={post.voteScore} />
                <div className="content">
                  <h3>
                    <a href={`/${category.path}/${post.id}`}>{post.title}</a>
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
        <div className="categories">
          <h2>Categories</h2>
          <ol>
            {categories.map(({ name, path }) => (
              <li key={path}>
                <a href={`/${path}/`}>{name}</a>
              </li>
            ))}
          </ol>
          <h3>All posts</h3>
          <ol>
            <li>
              <a href="/">Frontpage</a>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default CategoryView;
