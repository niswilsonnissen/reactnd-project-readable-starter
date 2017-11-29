import React from "react";
import { withRouter } from "react-router-dom";

const FilterBar = props => {
  const handleOrderByChange = e => {
    const { history, location } = props;
    e.preventDefault();
    const orderBy = e.target.value;
    const url = `${location.pathname}?orderBy=${encodeURIComponent(orderBy)}`;
    history.replace(url);
  };

  const sortOptions = [
    {
      value: "voteScore",
      text: "Votes"
    },
    {
      value: "timestamp",
      text: "Date"
    }
  ];

  return (
    <div className="filter-bar">
      Order posts by:{" "}
      <select value={props.orderBy} onChange={handleOrderByChange}>
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default withRouter(FilterBar);
