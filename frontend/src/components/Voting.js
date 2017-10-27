import React, { Component } from "react";

class Voting extends Component {
  handleVoteUp = e => {
    e.preventDefault();
    if (typeof this.props.voteUp === "function") {
      this.props.voteUp({ id: this.props.id });
    }
  };

  handleVoteDown = e => {
    e.preventDefault();
    if (typeof this.props.voteDown === "function") {
      this.props.voteDown({ id: this.props.id });
    }
  };

  render() {
    return (
      <div className="voting">
        <button title="Vote up" onClick={this.handleVoteUp}>
          <span className="icon icon-thumbsup" />
        </button>
        <button title="Vote down" onClick={this.handleVoteDown}>
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
