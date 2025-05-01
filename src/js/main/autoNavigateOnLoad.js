import { navigation } from '../pageLoader/navigation.js';
import { PageEnum } from '../data/enums.js';
import { renderUploadedDocs } from '../uploaddocs/index.js';
import { delayByMs } from '../helpers/delayByMs.js';
import { goToUploadDocsPage } from '../global/generalNavigations.js';

const navigator = navigation();

export async function autoNavigateOnLoad() {
  console.log('@autoNavigateOnLoad');
  
  const stepData = window.stepDataStore.get();

  // if (!stepData.register) {
  //   // Usuário não começou nem o registro
  //   await navigate(PageEnum.HOME_LOGGED_OUT);
  //   return;
  // }

  // if (stepData.register && !stepData.authenticate) {
  //   // Começou registro, mas não autenticou ainda
  //   await navigate(PageEnum.HOME_UNAUTHENTICATED);
  //   return;
  // }

  // if (!stepData.authenticate) {
  //   await navigate(PageEnum.HOME_UNAUTHENTICATED);
  //   return;
  // }

  // if (stepData.register && stepData.authenticate && !stepData.login) {
  //   // Terminou registro e autenticação, mas ainda não fez login
  //   await navigate(PageEnum.HOME_UNAUTHENTICATED);
  //   return;
  // }

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
    // Terminou registro e autenticação, mas ainda não fez login
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
      
      navigator.navigate(hash);
      // if (hash === PageEnum.UPLOAD_DOCS) {
      //   await delayByMs(3000);
      //   renderUploadedDocs();
      // }

      return;
    }

    // Tudo feito: registro + autenticação + login
    await navigator.navigate(PageEnum.HOME_LOGGED_IN);
    // app.classList.add('logged-in');
    // app.classList.remove('logged-out');
    return;
  }

  // Se cair aqui é porque algo tá inconsistente
  console.error('🚨 Estado inválido detectado no stepDataStore.', stepData);
}