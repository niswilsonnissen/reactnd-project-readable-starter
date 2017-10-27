import React, { Component } from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../utils/helpers";

class CategoryList extends Component {
  render() {
    const { categories, showFrontpage } = this.props;

    return (
      <div className="categories">
        <h2>Categories</h2>
        <ol>
          {categories.map(({ name, path }) => (
            <li key={path}>
              <Link to={`/${path}/`}>{capitalize(name)}</Link>
            </li>
          ))}
        </ol>
        {showFrontpage && (
          <div>
            <h3>All posts</h3>
            <ol>
              <li>
                <Link to="/">Frontpage</Link>
              </li>
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default CategoryList;
