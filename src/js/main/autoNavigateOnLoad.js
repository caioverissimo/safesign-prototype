import { navigation } from '../pageLoader/navigation.js';
import { PageEnum } from '../data/enums.js';

const { navigate } = navigation();

export async function autoNavigateOnLoad() {
  const stepData = window.stepDataStore.get();

  if (!stepData.register) {
    // Usuário não começou nem o registro
    await navigate(PageEnum.HOME_LOGGED_OUT);
    return;
  }

  if (stepData.register && !stepData.authenticate) {
    // Começou registro, mas não autenticou ainda
    await navigate(PageEnum.HOME_UNAUTHENTICATED);
    return;
  }

  if (stepData.register && stepData.authenticate && !stepData.login) {
    // Terminou registro e autenticação, mas ainda não fez login
    await navigate(PageEnum.HOME_UNAUTHENTICATED);
    return;
  }

  if (stepData.register && stepData.authenticate && stepData.login) {
    // Tudo feito: registro + autenticação + login
    await navigate(PageEnum.HOME_LOGGED_IN);
    return;
  }

  // Se cair aqui é porque algo tá inconsistente
  console.error('🚨 Estado inválido detectado no stepDataStore.', stepData);
}