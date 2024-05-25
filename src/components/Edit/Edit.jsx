import React, { useState } from 'react';
import { DataService } from '../../services/Data/DataService';
import '../../assets/styles/Pages_CSS/HistoryComp/Edit.css'

const Edit = ({ item, onClose }) => {
  const [sleeveLength, setSleeveLength] = useState(item.length || '');
  const [neckline, setNeckline] = useState(item.style || '');
  const [fabric, setFabric] = useState(item.material || '');

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      type: item.type,
      length: sleeveLength,
      style: neckline,
      material: fabric,
    };

    DataService.update(item.key, updatedData)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div className="edit-container">
      <h4>Edit Your Order</h4>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="length">Sleeve Length</label>
          <select
            id="length"
            className="form-control"
            value={sleeveLength}
            onChange={(e) => setSleeveLength(e.target.value)}
            required
          >
            <option value="">Select sleeve length</option>
            <option value="short">Short Sleeve</option>
            <option value="long">Long Sleeve</option>
            <option value="sleeveless">Sleeveless</option>
            <option value="cap">Cap Sleeve</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="style">Neckline Style</label>
          <select
            id="style"
            className="form-control"
            value={neckline}
            onChange={(e) => setNeckline(e.target.value)}
            required
          >
            <option value="">Select neckline style</option>
            <option value="crew">Crew Neck</option>
            <option value="vneck">V-Neck</option>
            <option value="scoop">Scoop Neck</option>
            <option value="boat">Boat Neck</option>
            <option value="halter">Halter Neck</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="material">Fabric Type</label>
          <select
            id="material"
            className="form-control"
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
            required
          >
            <option value="">Select fabric type</option>
            <option value="silk">Silk</option>
            <option value="chiffon">Chiffon</option>
            <option value="cotton">Cotton</option>
            <option value="polyester">Polyester</option>
            <option value="blend">Blend</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-2">Save</button>
        <button type="button" className="btn btn-secondary mt-2" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export { Edit };