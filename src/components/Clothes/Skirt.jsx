import React, { useState, useEffect } from 'react'
import { DataService } from '../../services/Data/DataService';
import '../../assets/styles/clothesType/clothesType.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Skirt = ({ type, cancel, progress }) => {
  const [isSubmit, setIsSubmit] = useState(localStorage.getItem('isSubmit') === "true");
  const [length, setLength] = useState(localStorage.getItem('length') || '');
  const [style, setStyle] = useState(localStorage.getItem('style') || '');
  const [material, setMaterial] = useState(localStorage.getItem('material') || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      type: type,
      length: length,
      style: style,
      material: material
    };

    DataService.create(data)
      .then(() => {
        console.log('Skirt details submitted successfully:', data);
        setLength('');
        setStyle('');
        setMaterial('');
        setIsSubmit(true);
      })
      .catch((error) => {
        console.error('Error submitting Skirt details:', error);
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('isSubmit');
    localStorage.removeItem('length');
    localStorage.removeItem('style');
    localStorage.removeItem('material');
  }

  const handleBack = () => {
    localStorage.removeItem('isSubmit');
    setIsSubmit(false);
  }

  useEffect(() => {
    if (isSubmit) {
      progress(100);
      localStorage.setItem('isSubmit', true);
    }
    else {
      localStorage.setItem('isSubmit', false);
      localStorage.setItem('length', length);
      localStorage.setItem('style', style);
      localStorage.setItem('material', material);
    }
  }, [isSubmit, progress, length, style, material]);

  return (
    <div >
      {isSubmit ? (
        <>
          <div className='success-container'>
            <h4>You submitted successfully!</h4>
            <Link to="/" className="btn btn-success" onClick={clearLocalStorage} type={type}>Order Again</Link><br />
            <Link to="/history" onClick={clearLocalStorage} className="btn btn-success">See Orders</Link>
            <button className="btn btn-secondary" onClick={handleBack}>
              Back
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="container-body">
            <h2>Custom Your Skirt</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="length">Length</label>
                <select
                  id="length"
                  className="form-control"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  required
                >
                  <option value="">Select length</option>
                  <option value="mini">Mini</option>
                  <option value="knee">Knee-length</option>
                  <option value="midi">Midi</option>
                  <option value="maxi">Maxi</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="style">Style</label>
                <select
                  id="style"
                  className="form-control"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  required
                >
                  <option value="">Select style</option>
                  <option value="a-line">A-line</option>
                  <option value="pencil">Pencil</option>
                  <option value="pleated">Pleated</option>
                  <option value="wrap">Wrap</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="material">Material</label>
                <select
                  id="material"
                  className="form-control"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  required
                >
                  <option value="">Select material</option>
                  <option value="cotton">Cotton</option>
                  <option value="denim">Denim</option>
                  <option value="leather">Leather</option>
                  <option value="silk">Silk</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
            <button type="back-button" className="btn btn-secondary mt-2" onClick={cancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export { Skirt }