import React, { Component } from "react";

class AdminButtons extends Component {
  handleDeleteClick = e => {
    const { id } = this.props;
    e.preventDefault();
    this.props.onDeleteClick({ id });
  };

  render() {
    return (
      <div className="admin">
        <button title={`Edit ${this.props.name}`}>
          <span className="icon icon-edit" />
        </button>
        <button
          title={`Delete ${this.props.name}`}
          onClick={this.handleDeleteClick}
        >
          <span className="icon icon-delete" />
        </button>
      </div>
    );
  }
}

export default AdminButtons;
