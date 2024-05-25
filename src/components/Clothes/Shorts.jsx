import React, { useState, useEffect } from 'react'
import { DataService } from '../../services/Data/DataService';
import '../../assets/styles/clothesType/clothesType.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Shorts = ({ type, cancel, progress }) => {
  const [isSubmit, setIsSubmit] = useState(localStorage.getItem('isSubmit') === "true");
  const [length, setLength] = useState(localStorage.getItem('length') || '');
  const [style, setStyle] = useState(localStorage.getItem('style') || '');
  const [fabric, setFabric] = useState(localStorage.getItem('fabric') || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      type: type,
      length: length,
      style: style,
      material: fabric
    };

    DataService.create(data)
      .then(() => {
        setLength('');
        setStyle('');
        setFabric('');
        setIsSubmit(true);
      })
      .catch((error) => {
        console.error('Error submitting Shorts:', error);
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('isSubmit');
    localStorage.removeItem('length');
    localStorage.removeItem('style');
    localStorage.removeItem('fabric');
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
      localStorage.setItem('fabric', fabric);
    }
  }, [isSubmit, progress, length, style, fabric]);

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
            <h2>Custom Your Shorts</h2>
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
                  <option value="short">Short</option>
                  <option value="mid">Mid-Length</option>
                  <option value="long">Long</option>
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
                  <option value="casual">Casual</option>
                  <option value="cargo">Cargo</option>
                  <option value="athletic">Athletic</option>
                  <option value="bermuda">Bermuda</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="material">Fabric</label>
                <select
                  id="material"
                  className="form-control"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  required
                >
                  <option value="">Select fabric</option>
                  <option value="cotton">Cotton</option>
                  <option value="denim">Denim</option>
                  <option value="linen">Linen</option>
                  <option value="polyester">Polyester</option>
                  <option value="blend">Blend</option>
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

export { Shorts }