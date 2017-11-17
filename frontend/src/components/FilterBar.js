import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class FilterBar extends Component {
  handleOrderByChange = e => {
    const { history, location } = this.props;
    e.preventDefault();
    const orderBy = e.target.value;
    const url = `${location.pathname}?orderBy=${encodeURIComponent(orderBy)}`;
    history.replace(url);
  };

  render() {
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
        <select value={this.props.orderBy} onChange={this.handleOrderByChange}>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default withRouter(FilterBar);
