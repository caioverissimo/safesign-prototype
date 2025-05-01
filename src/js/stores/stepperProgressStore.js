// export function createStepStore(initialValue = null) {
//   let currentSteps = initialValue || {
//     step1: false,
//     step2: false,
//     step3: false,
//     step4: false,
//   };

//   function get() {
//     return currentSteps;
//   }

//   function setStep(stepKey, value) {
//     if (currentSteps.hasOwnProperty(stepKey)) {
//       currentSteps[stepKey] = value;
//       // If you want to persist it:
//       window.sessionStorage.setItem('stepperProgress', JSON.stringify(currentSteps));
//     }
//   }

//   function loadFromStorage() {
//     try {
//       const stored = JSON.parse(window.sessionStorage.getItem('stepperProgress'));
//       if (stored) currentSteps = stored;
//     } catch (error) {
//       console.error('Error loading step progress from sessionStorage', error);
//     }
//   }

//   return {
//     get,
//     setStep,
//     loadFromStorage,
//   };
// }

// src/js/stores/stepperProgressStore.js

import { useSessionStorage } from '../helpers/useSessionStorage.js';

const defaultStepperProgress = {
  step1: false,
  step2: false,
  step3: false,
  step4: false,
};

export function createStepperProgressStore() {
  const session = useSessionStorage('stepperProgress', defaultStepperProgress);

  function get() {
    return session.get();
  }

  function setStep(stepKey, value) {
    const current = session.get();
    const updated = { ...current, [stepKey]: value };
    session.set(updated);
  }

  function reset() {
    session.set(defaultStepperProgress);
  }

  return {
    get,
    setStep,
    reset,
  };
}




// NOTE: USAGE

// import { createStepperProgressStore } from '../stores/stepperProgressStore';

// const stepperProgress = createStepperProgressStore();

// // Mark step1 as completed
// stepperProgress.setStep('step1', true);

// // Read progress (returns { step1: true, step2: false, step3: false, step4: false })
// const progress = stepperProgress.get();
// console.log(progress);

// // Reset all progress
// stepperProgress.reset();