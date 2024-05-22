import React, { useState, useEffect } from 'react'
import { DataService } from '../../../services/Data/DataService'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import '../../../assets/styles/Pages_CSS/Popup/TypePopup.css'

const CreateTypePopup = ({ close, type, isOpenType, updateProgress }) => {
  const [selectedType] = useState(type);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSize, setIsSize] = useState("");
  const [isColor, setIsColor] = useState("");
  const [isLengthToArm, setIsLengthToArm] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleSave = () => {
    if (!isSize) {
      setValidationMessage("Please select size.");
      return;
    }
    if (!isColor) {
      setValidationMessage("Please select color.");
      return;
    }
    if (!isLengthToArm) {
      setValidationMessage("Please select arm's length.");
      return;
    }
    let data = {
      type: selectedType,
      size: isSize,
      color: isColor,
      length: isLengthToArm,
    };

    DataService.create(data)
      .then(() => {
        setIsSubmit(true);
      })
      .catch((e) => console.log(e));
  };

  const clearStates = () => {
    setIsSize("");
    setIsColor("");
    setIsLengthToArm("");
    setIsSubmit(false);
    setValidationMessage('');
  };

  const handleBackFromPupup = () => {
    clearStates();
    close();
  }

  useEffect(() => {
    if (!isSubmit) {
      updateProgress(70);
    }
    if (isSubmit) {
      updateProgress(100);
    }
  }, [isSubmit, isOpenType, updateProgress]);

  return (
    <div className="submit-form">
      {isSubmit ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={handleBackFromPupup} type={selectedType}>Order Again</button><br />
          <Link to="/history" className="btn btn-success" >Orders</Link>
          <button className="btn btn-secondary" onClick={clearStates}>
            Back
          </button>
        </div>
      ) : (
        <div>
          <h2>Custom {selectedType} </h2>
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <div>
              <button className={`size-button ${isSize === "S" ? "selected" : ""}`} onClick={() => setIsSize("S")}>S</button>
              <button className={`size-button ${isSize === "M" ? "selected" : ""}`} onClick={() => setIsSize("M")}>M</button>
              <button className={`size-button ${isSize === "L" ? "selected" : ""}`} onClick={() => setIsSize("L")}>L</button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <div>
              <button className={`color-button ${isColor === "red" ? "selected" : ""}`} onClick={() => setIsColor("red")}>Red</button>
              <button className={`color-button ${isColor === "yellow" ? "selected" : ""}`} onClick={() => setIsColor("yellow")}>Yellow</button>
              <button className={`color-button ${isColor === "green" ? "selected" : ""}`} onClick={() => setIsColor("green")}>Green</button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="arms">Arm's length</label>
            <div>
              <button className={`arm-button ${isLengthToArm === "long" ? "selected" : ""}`} onClick={() => setIsLengthToArm("long")}>Long</button>
              <button className={`arm-button ${isLengthToArm === "short" ? "selected" : ""}`} onClick={() => setIsLengthToArm("short")}>Short</button>
              <button className={`arm-button ${isLengthToArm === "medium" ? "selected" : ""}`} onClick={() => setIsLengthToArm("medium")}>Medium</button>
            </div>
          </div>
          {validationMessage && <p className="validation-message">{validationMessage}</p>}
          <button onClick={handleSave} className="btn btn-success">
            Finish
          </button>
          <button onClick={close} className="btn btn-secondary">
            Back
          </button>
        </div>
      )}
    </div>
  )
}

export { CreateTypePopup }