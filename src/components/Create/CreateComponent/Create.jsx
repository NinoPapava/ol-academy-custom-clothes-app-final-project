import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../../Home/Navbar/Header'
import { Footer } from '../../Home/Navbar/Footer'
import types from '../../../services/Types/types.json';
import { CreateTypePopup } from '../CreatePopup/CreateTypePopup';
import '../../../assets/styles/Pages_CSS/Create.css';

const Create = () => {
  const [isOpenType, setIsOpenType] = useState(false);
  const [isSelectedType, setIsSelectedType] = useState(false);
  const [progress, setProgress] = useState(0);
  const isTypeRef = useRef(null);

  const updateProgress = (value) => {
    setProgress(value);
  };

  const handleClickOutside = (event) => {
    if (!isTypeRef.current?.contains(event.target)) {
      setIsOpenType(true);
      setIsSelectedType(true);
    }
    if (event.target.classList.contains('background') || event.target.classList.contains('content')) {
      return;
    }
    setIsOpenType(true);
    setIsSelectedType(true);
  };

  const handleSelectType = (type) => {
    setIsSelectedType(type);
    setIsOpenType(true);
  };

  const handleBackButton = () => {
    setIsOpenType(false);
  };

  useEffect(() => {
    if (isOpenType) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenType]);

  useEffect(() => {
    if (!isOpenType) {
      setProgress(30)
    }
  }, [isOpenType]);

  return (
    <div>
      <Header />
      <div className='container'>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="container__background" ref={isTypeRef}>
          {isOpenType && isSelectedType ? (
            <>
              <CreateTypePopup close={handleBackButton} type={isSelectedType} updateProgress={updateProgress} />
            </>
          ) : (
            <>
              <div className="clothing-grid">
                {types.clothes.map(({ type }) => (
                  <div key={type} className="clothing-box" onClick={() => handleSelectType(type)}>
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Create };