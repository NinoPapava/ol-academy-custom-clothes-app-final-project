import React, { useEffect } from 'react'
import { DataService } from '../../services/Data/DataService';
import '../../assets/styles/clothesType/clothesType.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { LocalStorage } from '../LocalStorage/LocalStorage';

const Jeans = ({ type, cancel, progress }) => {
  const [isSubmit, setIsSubmit] = LocalStorage('isSubmit', false, 10);
  const [fit, setFit] = LocalStorage('fit', '', 10);
  const [style, setStyle] = LocalStorage('style', '', 10);
  const [fabric, setFabric] = LocalStorage('fabric', '', 10);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      type: type,
      length: fit,
      style: style,
      material: fabric
    };

    DataService.create(data)
      .then(() => {
        setFit('');
        setStyle('');
        setFabric('');
        setIsSubmit(true);
      })
      .catch((error) => {
        console.error('Error submitting Jeans:', error);
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('isSubmit');
    localStorage.removeItem('fit');
    localStorage.removeItem('style');
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
            <h2>Custom Your Jeans</h2>
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
                  <option value="skinny">Skinny</option>
                  <option value="slim">Slim</option>
                  <option value="straight">Straight</option>
                  <option value="bootcut">Bootcut</option>
                  <option value="relaxed">Relaxed</option>
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
                  <option value="classic">Classic</option>
                  <option value="ripped">Ripped</option>
                  <option value="distressed">Distressed</option>
                  <option value="embellished">Embellished</option>
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
                  <option value="denim">Denim</option>
                  <option value="stretch">Stretch</option>
                  <option value="corduroy">Corduroy</option>
                  <option value="khaki">Khaki</option>
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

export { Jeans }