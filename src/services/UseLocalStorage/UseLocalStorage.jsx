import { useState, useEffect } from 'react';

const UseLocalStorage = (key, value, minutes) => {
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        const parsedItem = JSON.parse(item);
        if (Date.now() > parsedItem.expiry) {
          localStorage.removeItem(key);
          return value;
        }
        return parsedItem.state;
      } catch (error) {
        console.error('Error parsing localStorage item:', error);
        return value;
      }
    }
    return value;
  });

  useEffect(() => {
    const now = new Date();
    const item = {
      state,
      expiry: now.getTime() + minutes * 60 * 1000
    };
    localStorage.setItem(key, JSON.stringify(item));
  }, [key, state, minutes]);

  return [state, setState];

};

export { UseLocalStorage }