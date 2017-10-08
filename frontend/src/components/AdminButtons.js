import React, { Component } from "react";

class AdminButtons extends Component {
  render() {
    return (
      <div className="admin">
        <button title={`Edit ${this.props.name}`}>
          <span className="icon icon-edit" />
        </button>
        <button title={`Delete ${this.props.name}`}>
          <span className="icon icon-delete" />
        </button>
      </div>
    );
  }
}

export default AdminButtons;
