import { delayByMs } from '../helpers/delayByMs.js';
import { SESSION_KEYS } from '../data/sessionKeys.js';
import { defaultViewData } from '../data/defaults.js';
import { useSessionStorage } from '../helpers/useSessionStorage.js';

import { setupForms } from '../forms/index.js';
import { setupModals } from '../modals/index.js';
import { setupUploadArea } from '../uploadarea/index.js';
import { setupUploadDocs } from '../uploaddocs/index.js';
import { setupSideMenu } from '../sidemenu/index.js';
import { toggleLoader } from '../loader/index.js';
import { createPageStore } from '../stores/pageStore.js';
import { createStepperProgressStore } from '../stores/stepperProgressStore.js';
import { autoNavigateOnLoad } from './autoNavigateOnLoad.js'
import { navigation } from '../pageLoader/navigation.js';
import { defaultSessionData } from '../data/defaults.js'
import { setupStepper } from '../stepper/index.js'

import { createUploadDocsStore } from '../stores/uploadDocsStore.js';
import { setupGeneralNavigations } from '../global/generalNavigations.js';
import { setupDocDetails } from '../docdetails/index.js';
import { setupDocumentSignature } from '../documentsignature/index.js';
import { setupRecipients } from '../recipients/index.js';
import { createSignaturesStore } from '../stores/signaturesStore.js';

const navigator = navigation();

// Declare a global variable to hold your session storage
let viewportStore;

export const setupMain = async () => {
  console.log('@main');
  
  window.pageStore = createPageStore();

  window.stepDataStore = useSessionStorage(SESSION_KEYS.STEP_DATA, defaultSessionData);

  // Initialize SessionStorage
  window.viewportStore = useSessionStorage(SESSION_KEYS.VIEWPORT, defaultViewData.viewport);

  // Example of setting viewport
  window.viewportStore.set('DESKTOP');

  const stepperProgress = createStepperProgressStore();
  window.stepperProgress = stepperProgress;

  const uploadDocsStore = createUploadDocsStore();
  window.uploadDocsStore = uploadDocsStore;

  const signaturesStore = createSignaturesStore();
  window.signaturesStore = signaturesStore;


  await delayByMs(1000);

  setupForms();
  setupModals();
  setupUploadArea();
  setupUploadDocs();
  setupSideMenu();
  setupStepper();
  setupGeneralNavigations();
  setupDocDetails();
  setupDocumentSignature();
  setupRecipients();
  setupDocumentSignature();


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



// Example of a logout function
// export async function logout() {
//   const navigator = navigation();
  
//   // Clear login flags
//   window.stepDataStore.set({
//     register: false,
//     authenticate: false,
//     login: false,
//   });

//   await navigator.navigate(PageEnums.HOME_LOGGED_OUT);
// }

// Example of login success function
// export async function loginSuccess() {
//   const navigator = navigation();
  
//   window.stepDataStore.set({
//     register: true,
//     authenticate: true,
//     login: true,
//   });

//   await navigator.navigate(PageEnums.HOME_LOGGED_IN);
// }