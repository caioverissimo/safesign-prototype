import { useSessionStorage } from '../helpers/useSessionStorage.js';

const defaultSelfieValidation = {
  confirmed: false
};

export function createSelfieValidationStore() {
  const session = useSessionStorage('selfieValidation', defaultSelfieValidation);

  function get() {
    return session.get();
  }

  function setConfirmed(value) {
    session.set({ confirmed: value });
  }
  function reset() {
    session.set(defaultSelfieValidation);
  }

  return {
    get,
    setConfirmed,
    reset,
  };
}