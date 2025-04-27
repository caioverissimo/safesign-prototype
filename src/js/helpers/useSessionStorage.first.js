function useSessionStorage(key, initialValue) {
  let item;
  
  try {
    const storedItem = window?.sessionStorage?.getItem(key);
    item = storedItem ? JSON.parse(storedItem) : initialValue;
  } catch (error) {
    item = initialValue;
  }

  function setItem(value) {
    try {
      item = value;
      window?.sessionStorage?.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to set sessionStorage item', error);
    }
  }

  function removeItem() {
    try {
      window?.sessionStorage?.removeItem(key);
    } catch (error) {
      console.error('Failed to remove sessionStorage item', error);
    }
  }

  function getItem() {
    return item;
  }

  return [getItem, setItem, removeItem];
}