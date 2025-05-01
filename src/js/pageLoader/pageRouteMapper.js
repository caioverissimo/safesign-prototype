import { PageEnum } from '../data/enums.js';

export const pageRouteMapper = {
  // HOME_LOGGED_OUT: '/home',
  // HOME_LOGGED_IN: '/home-logged-in',
  // HOME_UNAUTHENTICATED: '/signup',
  // [PageEnum.HOME_LOGGED_OUT]: '/home',
  [PageEnum.HOME_UNAUTHENTICATED]: '/home',
  [PageEnum.HOME_LOGGED_IN]: '/home-logged-in',
  [PageEnum.UPLOAD_DOCS]: '/upload-docs',
  [PageEnum.RECIPIENT_REGISTRATION]: '/recipient-registration',
  [PageEnum.SELFIE_BIOMETRY]: '/selfie-biometry',
  [PageEnum.DOCUMENT_SIGNATURE]: '/document-signature',
};
