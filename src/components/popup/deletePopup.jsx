import React from "react";

const DeletePopup = ({ report, onDelete, onClose }) => {
  return (
    <div className="popup">
      <h2>Delete Report</h2>
      <p>Are you sure you want to delete this report?</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeletePopup;
