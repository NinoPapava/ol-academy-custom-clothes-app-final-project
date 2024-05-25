import React, { useState, useEffect } from 'react'
import { DataService } from '../../services/Data/DataService';
import '../../assets/styles/clothesType/clothesType.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { UseLocalStorage } from '../../services/UseLocalStorage/UseLocalStorage';

const Dress = ({ type, cancel, progress }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [sleeveLength, setSleeveLength] = UseLocalStorage('sleeveLengthKey', '', 10);
  const [neckline, setNeckline] = UseLocalStorage('neckline', '', 10);
  const [fabric, setFabric] = UseLocalStorage('fabric', '', 10);

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
        console.error('Error submitting Dress:', error);
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('isSubmit');
    localStorage.removeItem('sleeveLength');
    localStorage.removeItem('neckline');
    localStorage.removeItem('fabric');
  }

  const handleBack = () => {
    clearLocalStorage();
    setIsSubmit(false);
  }

  useEffect(() => {
    if (isSubmit) {
      progress(100);
    }
  }, [isSubmit, progress]);

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
            <h2>Custom Your Dress</h2>
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
                  <option value="strapless">Strapless</option>
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
                  <option value="vneck">V-Neck</option>
                  <option value="scoop">Scoop Neck</option>
                  <option value="halter">Halter Neck</option>
                  <option value="boat">Boat Neck</option>
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
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
            <button type="back-button" className="btn btn-secondary mt-2" onClick={cancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export { Dress }