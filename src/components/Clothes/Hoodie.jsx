import React, { useState, useEffect } from 'react'
import { DataService } from '../../services/Data/DataService';
import '../../assets/styles/clothesType/clothesType.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Hoodie = ({ type, cancel, progress }) => {
  const [isSubmit, setIsSubmit] = useState(localStorage.getItem('isSubmit') === "true");
  const [sleeveLength, setSleeveLength] = useState(localStorage.getItem('sleeveLength') || '');
  const [neckline, setNeckline] = useState(localStorage.getItem('neckline') || '');
  const [fabric, setFabric] = useState(localStorage.getItem('fabric') || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      type: type,
      length: sleeveLength,
      style: neckline,
      material: fabric
    };

    DataService.create(data)
      .then(() => {
        setSleeveLength('');
        setNeckline('');
        setFabric('');
        setIsSubmit(true);
      })
      .catch((error) => {
        console.error('Error submitting Hoodie:', error);
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('isSubmit');
    localStorage.removeItem('sleeveLength');
    localStorage.removeItem('neckline');
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
      localStorage.setItem('sleeveLength', sleeveLength);
      localStorage.setItem('neckline', neckline);
      localStorage.setItem('fabric', fabric);
    }
  }, [isSubmit, progress, sleeveLength, neckline, fabric]);

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
            <h2>Custom Your Hoodie</h2>
            <form onSubmit={handleSubmit}>
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
                  <option value="hooded">Hooded</option>
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
                  <option value="cotton">Cotton</option>
                  <option value="polyester">Polyester</option>
                  <option value="blend">Blend</option>
                  <option value="fleece">Fleece</option>
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

export { Hoodie }