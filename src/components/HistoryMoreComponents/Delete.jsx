import React from 'react'

const Delete = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete this item?</p>
      <button onClick={onConfirm} >Yes</button>
      <button onClick={onCancel} >No</button>
    </div>
  );
};

export { Delete }
