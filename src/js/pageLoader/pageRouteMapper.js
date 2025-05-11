import { PageEnum } from '../data/enums.js';

export const pageRouteMapper = {
  [PageEnum.HOME_UNAUTHENTICATED]: '/home',
  [PageEnum.HOME_LOGGED_IN]: '/home-logged-in',
  [PageEnum.UPLOAD_DOCS]: '/upload-docs',
  [PageEnum.RECIPIENT_REGISTRATION]: '/recipient-registration',
  [PageEnum.SELFIE_BIOMETRY]: '/selfie-biometry',
  [PageEnum.DOCUMENT_SIGNATURE]: '/document-signature',
};
