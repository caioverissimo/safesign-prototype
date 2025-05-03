// import { uploadDocsStore } from '../stores/uploadDocsStore.js';
// import { signatureStore } from '../stores/signatureStore.js';
// import { selfieValidationStore } from '../stores/selfieValidationStore.js'; // você pode criar esse store
// import { stepperProgressStore } from '../stores/stepperProgressStore.js';

export const stepRules = {
  step1: () => {
    const docs = window.uploadDocsStore.get();
    return docs.length > 0;
  },

  step2: () => {
    const recipients = window.signaturesStore.get();
    return recipients[0]?.signature && recipients[0]?.initials;
  },

  step3: () => {
    return window.selfieValidationStore.get().confirmed === true;
  },

  step4: () => {
    const docs = window.uploadDocsStore.get();
    console.log('stepRules | step4 -> docs: ', docs);
    return !!(docs.length && docs.every((doc) => doc.signed));
  },
};

export const updateStepperProgressStore = () => {

  const stepperProgress = window.stepperProgressStore.get();
  const docs = window.uploadDocsStore.get();


  console.log('store');
};

export const updateStepperUI = async () => {
  console.log('@updateStepperUI');
  

  const asideDataStepKeyNumber = document.querySelector('aside').getAttribute('data-aside-step-key');
  console.log('asideDataStepKeyNumber: ', asideDataStepKeyNumber);


  Object.entries(stepRules).forEach(([stepKey, isComplete]) => {
    const stepKeyNumber = parseInt(stepKey[stepKey.length - 1]);
    const nextStepKeyNumber = stepKeyNumber + 1;
  
    const stepElement = document.querySelector(`[data-step-key="${stepKeyNumber}"]`);
    const nextStepElement = document.querySelector(`[data-step-key="${nextStepKeyNumber}"]`);
  
    if (!stepElement) return;
  
    const passed = isComplete();

    if (Number(asideDataStepKeyNumber) === stepKeyNumber) {
      const highlightButton = document.querySelector('.button-highlight--right');

      if (passed) {
        highlightButton.removeAttribute('disabled');
        highlightButton.classList.remove('button-highlight--disabled');
      } else  {
        highlightButton.setAttribute('disabled', true);
        highlightButton.classList.add('button-highlight--disabled');
      }
    }
  
    // Save to store
    window.stepperProgressStore.setStep(stepKey, passed);
  
    // ⬇ REFRESH store data after mutation
    const updatedStoreData = window.stepperProgressStore.get();
  
    // Apply active/inactive style
    if (updatedStoreData[stepKey]) {
      stepElement.classList.add('stepper_item--active');
      stepElement.classList.remove('stepper_item--inactive');
    } else {
      stepElement.classList.remove('stepper_item--active');
      stepElement.classList.add('stepper_item--inactive');
    }
  
    // Apply clickable to next step only if current one passed
    if (passed && nextStepElement) {
      nextStepElement.classList.add('stepper_item--clickable');
    } else if (nextStepElement) {
      nextStepElement.classList.remove('stepper_item--clickable');
    }
  });
  

  // let updatedStoreData = window.stepperProgressStore.get();

  // // Highlight button da direita
  // const highlightButton = document.querySelector('.button-highlight--right');
  // if (highlightButton) {
  //   const currentStep = Object.keys(updatedStoreData).find((key) => {
  //     console.log('');
  //     console.log('updatedStoreData: ', updatedStoreData);
  //     console.log('key: ', key);
  //     console.log('updatedStoreData[key]: ', updatedStoreData[key]);
  //     return updatedStoreData[key] === true
  //   });
  //   const rule = stepRules[currentStep];

  //   if (rule && rule()) {
  //     highlightButton.removeAttribute('disabled');
  //     highlightButton.classList.remove('button-highlight--disabled');
  //   } else {
  //     highlightButton.setAttribute('disabled', true);
  //     highlightButton.classList.add('button-highlight--disabled');
  //   }
  // }
}

export const setupStepperNavigation = () => {
  console.log('@setupStepperNavigation');
  window.updateStepperUI = updateStepperUI;
};

