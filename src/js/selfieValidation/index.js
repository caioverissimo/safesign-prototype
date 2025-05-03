import { updateStepperUI } from "../stepper-navigation/index.js";

export const confirmSelfieValidation = () => {
  console.log('@confirmSelfieValidation');
  window.selfieValidationStore.setConfirmed(true);

  updateStepperUI();
};

export const setupSelfieValidation= async () => {
  console.log('@setupSelfieValidation')

  window.confirmSelfieValidation = confirmSelfieValidation;
};