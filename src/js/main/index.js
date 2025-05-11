import { delayByMs } from '../helpers/delayByMs.js';
import { SESSION_KEYS } from '../data/sessionKeys.js';
import { defaultViewData } from '../data/defaults.js';
import { useSessionStorage } from '../helpers/useSessionStorage.js';

import { setupForms } from '../forms/index.js';
import { setupModals } from '../modals/index.js';
import { setupUploadArea } from '../uploadarea/index.js';
import { setupUploadDocs } from '../uploaddocs/index.js';
import { setupSideMenu } from '../sidemenu/index.js';
import { setupLoader, toggleLoader } from '../loader/index.js';
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
import { setupStepperNavigation } from '../stepper-navigation/index.js';
import { createSelfieValidationStore } from '../stores/selfieValidationStore.js';
import { setupSelfieValidation } from '../selfieValidation/index.js';

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

  const stepperProgressStore = createStepperProgressStore();
  window.stepperProgressStore = stepperProgressStore;

  const uploadDocsStore = createUploadDocsStore();
  window.uploadDocsStore = uploadDocsStore;

  const selfieValidationStore = createSelfieValidationStore();
  window.selfieValidationStore = selfieValidationStore;
  
  const signaturesStore = createSignaturesStore();
  window.signaturesStore = signaturesStore;


  await delayByMs(1000);

  setupLoader();
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
  setupSelfieValidation();
  setupStepperNavigation();

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