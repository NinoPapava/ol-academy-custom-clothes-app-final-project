import React, { useEffect } from 'react'
import { DataService } from '../../services/Data/DataService';
import '../../assets/styles/clothesType/clothesType.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { LocalStorage } from '../LocalStorage/LocalStorage';

const Suit = ({ type, cancel, progress }) => {
  const [isSubmit, setIsSubmit] = LocalStorage('isSubmit', false, 10);
  const [fit, setFit] = LocalStorage('fit', '', 10);
  const [lapelStyle, setLapelStyle] = LocalStorage('lapelStyle', '', 10);
  const [fabric, setFabric] = LocalStorage('fabric', '', 10);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      type: type,
      length: fit,
      style: lapelStyle,
      material: fabric
    };

    DataService.create(data)
      .then(() => {
        setFit('');
        setLapelStyle('');
        setFabric('');
        setIsSubmit(true);
      })
      .catch((error) => {
        console.error('Error submitting Suit:', error);
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('isSubmit');
    localStorage.removeItem('fit');
    localStorage.removeItem('lapelStyle');
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
            <h2>Custom Your Suit</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="length">Fit</label>
                <select
                  id="length"
                  className="form-control"
                  value={fit}
                  onChange={(e) => setFit(e.target.value)}
                  required
                >
                  <option value="">Select fit</option>
                  <option value="slim">Slim Fit</option>
                  <option value="regular">Regular Fit</option>
                  <option value="classic">Classic Fit</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="style">Lapel Style</label>
                <select
                  id="style"
                  className="form-control"
                  value={lapelStyle}
                  onChange={(e) => setLapelStyle(e.target.value)}
                  required
                >
                  <option value="">Select lapel style</option>
                  <option value="notch">Notch Lapel</option>
                  <option value="peak">Peak Lapel</option>
                  <option value="shawl">Shawl Lapel</option>
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
                  <option value="wool">Wool</option>
                  <option value="cotton">Cotton</option>
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

export { Suit }