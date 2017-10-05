import React, { Component } from "react";

class MainView extends Component {
  render() {
    const { categories } = {
      categories: [
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
      ]
    };

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

    return (
      <div className="container">
        <div className="posts">
          <h1>Latest posts</h1>
          <div className="filter-bar">
            Order by:{" "}
            <select>
              <option value="date">Date</option>
              <option value="votes">Votes</option>
            </select>
          </div>
          {Object.keys(posts).map(key => {
            const post = posts[key];
            const category = categories.find(cat => cat.name === post.category);
            return (
              <div key={key} className="post">
                <div className="voting">
                  <button>Up</button>
                  <button>Down</button>
                </div>
                <h3>
                  <a href={`/${category.path}/${key}`}>{post.title}</a>
                </h3>
                <div className="post-info">
                  posted by: {post.author}, comments: XYZ, votes:{" "}
                  {post.voteScore}
                </div>
                <div className="post-admin">
                  <button>Edit post</button>
                  <button>Delete post</button>
                </div>
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
        </div>
      </div>
    );
  }
}

export default MainView;
