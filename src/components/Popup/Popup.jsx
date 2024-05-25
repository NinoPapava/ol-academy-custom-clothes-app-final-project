import React, { useEffect, useRef } from 'react'

const Popup = ({ click, isPopup, setIsPopup, confirmDelete }) => {

  const isPopupRef = useRef('');

  useEffect(() => {
    function handleClickOutside(event) {
      if (isPopupRef.current && !isPopupRef.current.contains(event.target)) {
        setIsPopup(false);
      }
    }

    if (isPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopup, setIsPopup]);

  return (
    <div className="popup-background">
      <div className="popup-context" ref={isPopupRef}>
        <p>Are you sure you want to delete last item?</p>
        <button className='btn-primary' onClick={confirmDelete} >Yes</button>
        <button onClick={click} >No</button>
      </div>
    </div>
  )
}

export { Popup }