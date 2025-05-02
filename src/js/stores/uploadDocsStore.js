// src/js/stores/uploadDocsStore.js
import { useSessionStorage } from '../helpers/useSessionStorage.js';

const defaultDocs = [];

export function createUploadDocsStore() {
  const session = useSessionStorage('uploadedDocs', defaultDocs);

  function get() {
    return session.get();
  }

  function set(value) {
    session.set(value);
  }

  function add(doc) {
    const current = session.get();
    const updated = [...current, { ...doc, signed: false }];
    session.set(updated);
  }

  function toggleSignature(index) {
    const docs = session.get();

    if (docs[index]) {
      docs[index].signed = !docs[index].signed;
      session.set([...docs]);
    }
  }

  function clear() {
    session.set([]);
  }

  return {
    get,
    set,
    add,
    toggleSignature,
    clear,
  };
}
