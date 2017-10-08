import React, { Component } from "react";

class FilterBar extends Component {
  render() {
    const sortOptions = [
      {
        value: "date",
        text: "Date"
      },
      {
        value: "votes",
        text: "Votes"
      }
    ];

    return (
      <div className="filter-bar">
        Order posts by:{" "}
        <select>
          {sortOptions.map(option => (
            <option value={option.value}>{option.text}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default FilterBar;
