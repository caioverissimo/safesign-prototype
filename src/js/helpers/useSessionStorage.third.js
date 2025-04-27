function useSessionStorage(key, initialValue) {
  // Load value from sessionStorage or fallback
  let item;
  try {
    const storedItem = window?.sessionStorage?.getItem(key);

    if (storedItem === null) {
      item = initialValue;
    } else {
      try {
        item = JSON.parse(storedItem);
      } catch (error) {
        // If parsing fails, fallback to raw string
        item = storedItem;
      }
    }
  } catch (error) {
    item = initialValue;
  }

  function setItem(value) {
    try {
      item = value;
      const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
      window?.sessionStorage?.setItem(key, valueToStore);
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
