import { useSessionStorage } from '../helpers/useSessionStorage.js';
import { SESSION_KEYS } from '../data/sessionKeys.js';
import { delayByMs } from '../helpers/delayByMs.js';
import { autoNavigateOnLoad } from '../main/autoNavigateOnLoad.js'
import { toggleLoader } from "../loader/index.js";

function updateStepProgress(key, value = true) {
  const stepDataStore = window.stepDataStore;
  const current = stepDataStore.get();
  stepDataStore.set({ ...current, [key]: value });
}

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

  const phoneInput = document.getElementById('phone');

  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let numbers = e.target.value.replace(/\D/g, '');
      numbers = numbers.substring(0, 11);

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
};

export async function handleSubmit(event, onSuccessCallback) {
  const form = event.target;
  if (!form.checkValidity()) {

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

    updateStepProgress('register');

    paginateModalSignup('forms-token');
  });
}

async function handleTokenSubmit(event) {
  handleSubmit(event, async () => {
    console.log('Token autorizado, salvando authenticate = true');
    updateStepProgress('authenticate');

    toggleFloatingComponent('modal-signup');

    window.simulateLoading(1000, () => { 
      toggleFloatingComponent('modal-login')
    });
  });
}

async function handleLoginSubmit(event) {
  handleSubmit(event, async () => {
    const stepDataStore = window.stepDataStore;
    const current = stepDataStore.get();

    if (!current.register || !current.authenticate) {
      console.error('Erro: O usuário ainda não completou o registro ou a autenticação.');

      toggleFloatingComponent('modal-login', { shouldHaveLoader: false });
      await delayByMs(300);
      toggleFloatingComponent('modal-login-warning', { shouldHaveLoader: false });

      return;
    }

    updateStepProgress('login');
    toggleFloatingComponent('modal-login', { shouldHaveLoader: false });
    await delayByMs(500);
    autoNavigateOnLoad();
  });
}

export const handleLogout = async () => {
  console.log('@handleLogout');

  updateStepProgress('login', false);

  autoNavigateOnLoad();
};


export const setupForms = () => {``
  console.log('@setupForms');

  window.handleSubmit = handleSubmit;
  window.handleSignupSubmit = handleSignupSubmit;
  window.handleTokenSubmit = handleTokenSubmit;
  window.handleLoginSubmit = handleLoginSubmit;
  window.handleLogout = handleLogout;

  bindTokenInputBehaviour();
  bindPhoneMaskBehaviour();

  // TODO: refactor
  // const stepDataStore = useSessionStorage(SESSION_KEYS.STEP_DATA, {
  //   register: false,
  //   authenticate: false,
  //   login: false
  // });
};