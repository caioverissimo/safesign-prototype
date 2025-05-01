import { PageEnum } from '../data/enums.js';

export const pageSourceMapper = {
  [PageEnum.HOME_UNAUTHENTICATED]: './src/pages/home-unauthenticated.html',
  [PageEnum.HOME_LOGGED_IN]: './src/pages/home-logged-in.html',
  [PageEnum.UPLOAD_DOCS]: './src/pages/upload-docs.html',
  [PageEnum.RECIPIENT_REGISTRATION]: './src/pages/recipient-registration.html',
  [PageEnum.SELFIE_BIOMETRY]: './src/pages/selfie-biometry.html',
  [PageEnum.DOCUMENT_SIGNATURE]: './src/pages/document-signature.html',
};