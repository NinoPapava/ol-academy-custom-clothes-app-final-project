import { useState, useEffect } from 'react';
// its not working yet :)
const UseLocalStorage = (key, value, minutes) => {

  const [state, setState] = useState(() => {
    const item = localStorage.getItem(key);
    return item
      ? Date.now() > JSON.parse(item).expiry
        ? (localStorage.removeItem(key), value)
        : JSON.parse(item).state
      : value;
  });

  useEffect(() => {
    const now = new Date();
    localStorage.setItem(
      key,
      JSON.stringify({
        state,
        expiry: now.getTime() + minutes * 60 * 1000
      })
    );
  }, [key, state, minutes]);

  return [state, setState];
};

export { UseLocalStorage }