import { navigation } from '../pageLoader/navigation.js';
import { PageEnum } from '../data/enums.js';
import { renderUploadedDocs } from '../uploaddocs/index.js';
import { delayByMs } from '../helpers/delayByMs.js';
import { goToDocumentSignaturePage, goToRecipientRegistrationPage, goToSelfieBiometryPage, goToUploadDocsPage } from '../global/generalNavigations.js';

const navigator = navigation();

export async function autoNavigateOnLoad() {
  console.log('@autoNavigateOnLoad');
  const stepData = window.stepDataStore.get();

  const isLoggedIn = stepData.register && stepData.authenticate && stepData.login;

  const toggleLoginStateClass = () => {
    if (isLoggedIn) {
      app.classList.add('logged-in');
      app.classList.remove('logged-out');
    } else {
      app.classList.add('logged-out');
      app.classList.remove('logged-in');
    }
  };

  const app = document.getElementById('app-container');



  if (!isLoggedIn) {
    await navigator.navigate(PageEnum.HOME_UNAUTHENTICATED);
    app.classList.add('logged-out');
    app.classList.remove('logged-in');
    return;
  }

  if (isLoggedIn) {

    app.classList.add('logged-in');
    app.classList.remove('logged-out');

    const hash = navigator.getRoute();

    if (hash && hash !== PageEnum.HOME_UNAUTHENTICATED) {

      if (hash === PageEnum.UPLOAD_DOCS) {
        goToUploadDocsPage();
      }

      if (hash === PageEnum.DOCUMENT_SIGNATURE) {
        goToDocumentSignaturePage();
      }

      if (hash === PageEnum.RECIPIENT_REGISTRATION) {
        goToRecipientRegistrationPage();
      }

      if (hash === PageEnum.SELFIE_BIOMETRY) {
        goToSelfieBiometryPage();
      }
      
      navigator.navigate(hash);

      return;
    }

    await navigator.navigate(PageEnum.HOME_LOGGED_IN);

    return;
  }

  console.error('🚨 Estado inválido detectado no stepDataStore.', stepData);
}