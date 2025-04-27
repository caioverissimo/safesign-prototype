export function useSessionStorage(key, initialValue) {
  function safeParse(value) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  function safeStringify(value) {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  }

  function getItem() {
    try {
      const stored = window?.sessionStorage?.getItem(key);
      if (stored === null) return initialValue;
      return safeParse(stored);
    } catch (error) {
      console.error('Failed to read sessionStorage item', error);
      return initialValue;
    }
  }

  function setItem(value) {
    try {
      const valueToStore = safeStringify(value);
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

  // return [getItem, setItem, removeItem];
  return { 
    get: getItem,
    set: setItem,
    remove: removeItem,
  };
}
