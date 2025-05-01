import { PageEnum } from '../data/enums.js';

export const stepperNodeToPageMapper = {
  step1: PageEnum.UPLOAD_DOCS,        // Step 1 → Upload documents page
  step2: PageEnum.RECIPIENT_REGISTRATION,      // Step 2 → Home logged-in page
  step3: PageEnum.SELFIE_BIOMETRY,      // Step 3 → Home logged-in page (for now, you can adjust later)
  step4: PageEnum.DOCUMENT_SIGNATURE,      // Step 4 → Home logged-in page (for now, you can adjust later)
};
