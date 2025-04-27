import { delayByMs } from '../helpers/delayByMs.js';
import { SESSION_KEYS } from '../data/sessionKeys.js';
import { defaultViewData } from '../data/defaults.js';
import { useSessionStorage } from '../helpers/useSessionStorage.js';

import { setupForms } from '../forms/index.js';
import { setupModals } from '../modals/index.js';
import { setupUploadArea } from '../uploadarea/index.js';
import { setupSideMenu } from '../sidemenu/index.js';
import { toggleLoader } from '../loader/index.js';
import { createPageStore } from '../stores/pageStore.js';
import { autoNavigateOnLoad } from './autoNavigateOnLoad.js'
import { navigation } from '../pageLoader/navigation.js';
import { defaultSessionData } from '../data/defaults.js'

const navigator = navigation();

// Declare a global variable to hold your session storage
let viewportStore;

export const setupMain = async () => {
  console.log('@main');
  
  window.pageStore = createPageStore();

  window.stepDataStore = useSessionStorage(SESSION_KEYS.STEP_DATA, defaultSessionData);

  await delayByMs(1000);

  setupForms();
  setupModals();
  setupUploadArea();
  setupSideMenu();

  // Initialize SessionStorage
  window.viewportStore = useSessionStorage(SESSION_KEYS.VIEWPORT, defaultViewData.viewport);

  // Example of setting viewport
  window.viewportStore.set('DESKTOP');

  window.addEventListener('hashchange', () => {
    const hash = navigator.getRoute();
    if (hash) {
      navigator.navigate(hash);
    }
  });

  await autoNavigateOnLoad();
};


export const main = async () => {
  console.log('@main');

  setupMain();
  
  await delayByMs(1500);
  toggleLoader();
};