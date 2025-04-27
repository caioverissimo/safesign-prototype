import { useSessionStorage } from '../helpers/useSessionStorage.js';
import { SESSION_KEYS } from '../data/sessionKeys.js';

export const bindTokenInputBehaviour = () => {
  console.log('@setupForms | bindTokenInputBehaviour');

  document.querySelectorAll('.form-token-boxes input').forEach((input, index, inputs) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value === '' && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
}

export const bindPhoneMaskBehaviour = () => {
  console.log('@setupForms | bindPhoneMaskBehaviour');

  // document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');
  
    if (phoneInput) {
      phoneInput.addEventListener('input', function (e) {
        let numbers = e.target.value.replace(/\D/g, ''); // Remove non-digits
        numbers = numbers.substring(0, 11); // Limit to 11 numbers
  
        if (numbers.length > 0) {
          numbers = numbers.replace(/^(\d{2})(\d)/g, '($1) $2');
        }
        if (numbers.length > 9) {
          numbers = numbers.replace(/(\d{5})(\d{4})$/, '$1-$2');
        } else if (numbers.length > 6) {
          numbers = numbers.replace(/(\d{4})(\d{0,4})$/, '$1-$2');
        }
  
        e.target.value = numbers;
      });
    }
  // });
};

export function handleSubmit(event, onSuccessCallback) {
  const form = event.target;
  if (!form.checkValidity()) {
    // Let the browser show the default error popups
    return;
  }
  
  event.preventDefault();
  console.log('Form is valid! Proceed...');

  if (typeof onSuccessCallback === 'function') {
    onSuccessCallback();
  }
}

function handleSignupSubmit(event) {
  handleSubmit(event, () => {
    console.log('Cadastro enviado, salvando register = true');
    const stepDataStore = window.stepDataStore;
    const current = stepDataStore.get();
    stepDataStore.set({ ...current, register: true });

    paginateModalSignup('forms-token');
  });
}

function handleTokenSubmit(event) {
  handleSubmit(event, () => {
    console.log('Token autorizado, salvando authenticate = true');
    const stepDataStore = window.stepDataStore;
    const current = stepDataStore.get();
    stepDataStore.set({ ...current, authenticate: true });

    toggleFloatingComponent('modal-signup');
  });
}

function handleLoginSubmit(event) {
  handleSubmit(event, () => {
    const stepDataStore = window.stepDataStore;
    const current = stepDataStore.get();

    if (!current.register || !current.authenticate) {
      console.error('Erro: O usuário ainda não completou o registro ou a autenticação.');
      return;
    }

    console.log('Login autorizado, salvando login = true');
    stepDataStore.set({ ...current, login: true });

    // Você pode adicionar alguma ação, tipo fechar modal
    toggleFloatingComponent('modal-login', { shouldHaveLoader: false })
  });
}


export const setupForms = () => {``
  console.log('@setupForms');

  window.handleSubmit = handleSubmit;
  window.handleSignupSubmit = handleSignupSubmit;
  window.handleTokenSubmit = handleTokenSubmit;
  window.handleLoginSubmit = handleLoginSubmit;

  bindTokenInputBehaviour();
  bindPhoneMaskBehaviour();

  // TODO: refactor
  // const stepDataStore = useSessionStorage(SESSION_KEYS.STEP_DATA, {
  //   register: false,
  //   authenticate: false,
  //   login: false
  // });
};