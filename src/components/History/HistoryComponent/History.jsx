import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../../Home/Navbar/Header'
import { Footer } from '../../Home/Navbar/Footer'
import { DataService } from '../../../services/Data/DataService';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import '../../../assets/styles/Pages_CSS/History.css';
import { Delete } from '../HistoryMoreComponents/Delete'
import { Edit } from '../HistoryMoreComponents/Edit'

const History = () => {
  const [isClothes, setIsClothes] = useState([]);
  const [isCurrentIndex, setIsCurrentIndex] = useState(-1);
  const [isClicked, setIsClicked] = useState(false);
  const [isContextMenuPosition, setIsContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);
  const isContextRef = useRef(null);

  const onDataChange = (items) => {
    let tempClothes = [];
    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      tempClothes.push({
        key,
        type: data.type,
        size: data.size,
        color: data.color,
        length: data.length,
      });
    });
    setIsClothes(tempClothes);
  };

  const handleContextMenu = (e, index) => {
    e.preventDefault();
    setIsContextMenuPosition({ x: e.clientX, y: e.clientY });
    setIsCurrentIndex(index);
    setIsClicked(true);
  };

  const hideContext = () => {
    setIsClicked(false);
  };

  const handleUpdate = () => {
    hideContext();
    setIsShowUpdate(true);
  };

  const handleDelete = () => {
    setIsShowDeleteConfirm(true);
    hideContext();
  };

  const confirmDelete = (index) => {
    const itemId = isClothes[index].key;
    DataService.delete(itemId)
      .then(() => {
        setIsShowDeleteConfirm(false);
        setIsClothes(prevItems => prevItems.filter((item, i) => i !== index));
      })
      .catch(error => {
        console.error("Error deleting item:", error);
      });
  };

  const cancelDelete = () => {
    setIsShowDeleteConfirm(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isContextRef.current && !isContextRef.current.contains(e.target)) {
        hideContext();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    DataService.getAll().on("value", onDataChange);

    return () => {
      DataService.getAll().off("value", onDataChange);
    };
  }, []);

  return (
    <div>
      <Header />
      <div className='history-head'>
        <h4>Your Orders</h4>
        <Link to="/" className="main-page">Main page</Link>
      </div>
      <div className="list-history">
        {isClothes?.map((item, index) => (
          <div key={item.key} className='history-item' >
            <div
              onContextMenu={(e) => handleContextMenu(e, index)}
              className={"className='history-item' " + (index === isCurrentIndex ? "active" : "")}
            >
              type: {item.type} <br />
              size: {item.size} <br />
              color: {item.color} <br />
              length: {item.length} <br />
            </div>
          </div>
        ))}
      </div>
      {isClicked && (
        <div
          className="context-menu"
          style={{ top: isContextMenuPosition.y, left: isContextMenuPosition.x }}
          ref={isContextRef}
        >
          <div className="context-menu-option" onClick={handleUpdate}>Update</div>
          <div className="context-menu-option" onClick={handleDelete}>Delete</div>
        </div>
      )}
      {isShowDeleteConfirm && (
        <Delete onConfirm={() => confirmDelete(isCurrentIndex)} onCancel={cancelDelete} />
      )}
      {isShowUpdate && isClothes[isCurrentIndex] && (
        <Edit item={isClothes[isCurrentIndex]} onClose={() => setIsShowUpdate(false)} />
      )}
      <Footer />
    </div>
  );
};

export { History };
