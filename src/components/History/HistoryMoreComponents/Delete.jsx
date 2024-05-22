import React from 'react'
import '../../../assets/styles/Pages_CSS/HistoryComp/Delete.css'

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
