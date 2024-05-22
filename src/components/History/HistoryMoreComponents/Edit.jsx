import React, { useState } from 'react';
import { DataService } from '../../../services/Data/DataService';
import '../../../assets/styles/Pages_CSS/HistoryComp/Edit.css'

const Edit = ({ item, onClose }) => {
  const [type, setType] = useState(item.type);
  const [size, setSize] = useState(item.size);
  const [color, setColor] = useState(item.color);
  const [length, setLength] = useState(item.length);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedItem = {
      type: type,
      size: size,
      color: color,
      length: length,
    };

    DataService.update(item.key, updatedItem)
      .then(() => {
        console.log('Item updated successfully');
        onClose();
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div className="edit-popup">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Size:</label>
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Length:</label>
          <input type="text" value={length} onChange={(e) => setLength(e.target.value)} />
        </div>
        <button type="submit">Update</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export { Edit }
