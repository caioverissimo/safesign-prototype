import { useSessionStorage } from '../helpers/useSessionStorage.js';

const defaultSignatures = [
  {
    name: 'Caio Veríssimo Barbosa',
    email: '',
    signature: false,
    initials: true,
    signatureFile: './src/assets/signature-draw-caio-picture.png',
    isSelf: true,
  },
  {
    name: 'Beltrano de Carvalho',
    email: '',
    signature: true,
    initials: true,
    signatureFile: './src/assets/signature-draw-beltrano-picture.png',
    isSelf: false,
  },
  {
    name: 'Fulano de Tal',
    email: '',
    signature: false,
    initials: false,
    signatureFile: './src/assets/signature-draw-fulano-picture.png',
    isSelf: false,
  }
];

export function createSignaturesStore() {
  const session = useSessionStorage('recipientsSignatures', defaultSignatures);

  function get() {
    return session.get();
  }

  function set(value) {
    session.set(value);
  }

  function update(index, updatedFields) {
    const list = session.get();
    if (list[index]) {
      list[index] = { ...list[index], ...updatedFields };
      session.set(list);
    }
  }

  function toggleSignature(index) {
    const docs = session.get();

    if (docs[index]) {
      docs[index].signature = !docs[index].signature;
      session.set([...docs]);
    }
  }


  function clear() {
    session.set([]);
  }

  return {
    get,
    set,
    update,
    toggleSignature,
    clear,
  };
}
