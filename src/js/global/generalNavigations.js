import { navigation } from '../pageLoader/navigation.js';
import { PageEnum } from '../data/enums.js';
import { delayByMs } from '../helpers/delayByMs.js';
import { renderUploadedDocs } from '../uploaddocs/index.js';
import { renderRecipients } from '../recipients/index.js';
import { updateStepperUI } from '../stepper-navigation/index.js';

const navigator = navigation();

export const goToLoggedInPage = async () => {
  console.log('@goToLoggedInPage');
  navigator.navigate(PageEnum.HOME_LOGGED_IN);
};

export const goToUploadDocsPage = async () => {
  console.log('@goToUploadDocsPage');
  navigator.navigate(PageEnum.UPLOAD_DOCS);

  window.simulateLoading(3000, () => {
    renderUploadedDocs();
  });
};

export const goToRecipientRegistrationPage = async () => {
  console.log('@goToRecipientRegistrationPage');
  navigator.navigate(PageEnum.RECIPIENT_REGISTRATION);

  window.simulateLoading(3000, function() {
    updateStepperUI();
    renderRecipients();
  });
};

export const goToSelfieBiometryPage = async () => {
  console.log('@goToSelfieBiometryPage');
  navigator.navigate(PageEnum.SELFIE_BIOMETRY);

  window.simulateLoading(3000, () => {
    updateStepperUI();
  });
};

export const goToDocumentSignaturePage = async () => {
  console.log('@goToDocumentSignaturePage');
  navigator.navigate(PageEnum.DOCUMENT_SIGNATURE);

  window.simulateLoading(3000, () => {
    renderUploadedDocs();
  });
};

export const setupGeneralNavigations = async () => {
  console.log('@setupGeneralNavigations');

  window.goToLoggedInPage = goToLoggedInPage;
  window.goToUploadDocsPage = goToUploadDocsPage;
  window.goToRecipientRegistrationPage = goToRecipientRegistrationPage;
  window.goToSelfieBiometryPage = goToSelfieBiometryPage;
  window.goToDocumentSignaturePage = goToDocumentSignaturePage;
};
