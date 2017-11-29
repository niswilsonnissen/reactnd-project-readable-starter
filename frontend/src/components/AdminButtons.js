import React from "react";

const AdminButtons = props => {
  const handleDeleteClick = e => {
    const { id } = props;
    e.preventDefault();
    props.onDeleteClick({ id });
  };

  const handleEditClick = e => {
    const { id } = props;
    e.preventDefault();
    props.onEditClick({ id });
  };

  return (
    <div className="admin">
      <button title={`Edit ${props.name}`} onClick={handleEditClick}>
        <span className="icon icon-edit" />
      </button>
      <button title={`Delete ${props.name}`} onClick={handleDeleteClick}>
        <span className="icon icon-delete" />
      </button>
    </div>
  );
};

export default AdminButtons;
