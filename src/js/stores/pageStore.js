export function createPageStore(initialValue = null) {
  let currentPage = initialValue;

  function get() {
    return currentPage;
  }

  function set(newPage) {
    currentPage = newPage;
  }

  return {
    get,
    set,
  };
}
