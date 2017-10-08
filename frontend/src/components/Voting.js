import React, { Component } from "react";

class Voting extends Component {
  render() {
    return (
      <div className="voting">
        <button title="Vote up">
          <span className="icon icon-thumbsup" />
        </button>
        <button title="Vote down">
          <span className="icon icon-thumbsdown" />
        </button>
        <span className="vote-score" title="Current vote score">
          <span>{this.props.voteScore}</span>
        </span>
      </div>
    );
  }
}

export default Voting;
