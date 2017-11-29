import React from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../utils/helpers";

const CategoryList = props => {
  const { categories, showFrontpage } = props;

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
};

export default CategoryList;
