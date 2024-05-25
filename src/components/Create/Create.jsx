import React, { useState, useEffect, useRef } from 'react'
import { Header } from '../Navbar/Header'
import { Blouse } from '../Clothes/Blouse'
import { Dress } from '../Clothes/Dress'
import { Hoodie } from '../Clothes/Hoodie'
import { Jacket } from '../Clothes/Jacket'
import { Jeans } from '../Clothes/Jeans'
import { Shorts } from '../Clothes/Shorts'
import { Suit } from '../Clothes/Suit'
import { Skirt } from '../Clothes/Skirt'
import { Sweater } from '../Clothes/Sweater'
import { Tshirt } from '../Clothes/Tshirt'
import '../../assets/styles/Pages_CSS/Create.css'

const Create = () => {
  const [isOpenType, setIsOpenType] = useState(false)
  const [progress, setProgress] = useState(0);
  const [isSelectedType, setIsSelectedType] = useState(false)
  const isTypeRef = useRef(null)

  const handleClickOutside = (event) => {
    if (!isTypeRef.current?.contains(event.target)) {
      setIsOpenType(true)
      setIsSelectedType(true)
    }
    if (event.target.classList.contains('background') ||
      event.target.classList.contains('content')) {
      return
    }
    setIsOpenType(true)
    setIsSelectedType(true)
  };

  const handleSelectType = (type) => {
    setIsSelectedType(type)
    localStorage.setItem('selectedType', type);
  };

  const handleCancelButton = () => {
    setIsSelectedType(false);
    localStorage.removeItem('selectedType');
  };

  const localStorageRem = () => {
    localStorage.removeItem('selectedType');
  }

  const updateProgress = (value) => {
    setProgress(value);
  };


  useEffect(() => {
    const selectedType = localStorage.getItem('selectedType');
    if (selectedType) {
      setIsSelectedType(selectedType);
    }
  }, []);

  useEffect(() => {
    if (isOpenType) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [isOpenType]);

  useEffect(() => {
    if (!isOpenType) {
      setProgress(35)
    }
    if (isSelectedType) {
      setProgress(65)
    }
  }, [isOpenType, isSelectedType]);

  return (
    <div>
      <Header cansel={handleCancelButton} removeLocal={localStorageRem}/>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      {!isSelectedType ? (
        <>
          <div className="clothing-types-grid">
            <div className="clothing-type" onClick={() => handleSelectType('Blouse')}>
              <h3>Blouse</h3>
              <p>Formal Blouse</p>
            </div>
            <div className="clothing-type" onClick={() => handleSelectType('Dress')}>
              <h3>Dress</h3>
              <p>Formal Dress</p>
            </div>
            <div className="clothing-type" onClick={() => handleSelectType('Hoodie')}>
              <h3>Hoodie</h3>
              <p>Hoodie</p>
            </div>
            <div className="clothing-type" onClick={() => handleSelectType('Jacket')}>
              <h3>Jacket</h3>
              <p>Jacket</p>
            </div>
            <div className="clothing-type" onClick={() => handleSelectType('Jeans')}>
              <h3>Jeans</h3>
              <p>Jeans</p>
            </div>
            <div className="clothing-type" onClick={() => handleSelectType('Shorts')}>
              <h3>Shorts</h3>
              <p>Shorts</p>
            </div>
            <div className="clothing-type" onClick={() => handleSelectType('Skirt')}>
              <h3>Skirt</h3>
              <p>Skirt</p>
            </div>
            <div className="clothing-type" onClick={() => handleSelectType('Suit')}>
              <h3>Suit</h3>
              <p>Suit</p>
            </div>
            <div className="clothing-type" onClick={() => handleSelectType('Sweater')}>
              <h3>Sweater</h3>
              <p>Sweater</p>
            </div>
            <div className="clothing-type" onClick={() => handleSelectType('Tshirt')}>
              <h3>T-shirt</h3>
              <p>Standard T-shirt</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {isSelectedType === 'Blouse' && <Blouse type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
          {isSelectedType === 'Dress' && <Dress type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
          {isSelectedType === 'Hoodie' && <Hoodie type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
          {isSelectedType === 'Jacket' && <Jacket type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
          {isSelectedType === 'Jeans' && <Jeans type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
          {isSelectedType === 'Shorts' && <Shorts type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
          {isSelectedType === 'Skirt' && <Skirt type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
          {isSelectedType === 'Suit' && <Suit type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
          {isSelectedType === 'Sweater' && <Sweater type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
          {isSelectedType === 'Tshirt' && <Tshirt type={isSelectedType}
            cancel={handleCancelButton} progress={updateProgress} />}
        </>
      )}
    </div>
  );
};

export { Create };