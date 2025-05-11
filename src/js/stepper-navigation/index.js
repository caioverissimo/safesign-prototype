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

export const setupSidemenuStepClicks = () => {
  document.querySelectorAll('.sidemenu_steps li.stepper_item--clickable').forEach((item) => {
    item.onclick = () => {
      const stepKey = item.getAttribute('data-step-key');
      if (!stepKey) return;

      goToStep(parseInt(stepKey));
    };
  });
}

export const updateStepperUI = async () => {
  console.log('@updateStepperUI');

  const asideDataStepKeyNumber = document.querySelector('aside')?.getAttribute('data-aside-step-key');

  Object.entries(stepRules).forEach(([stepKey, isComplete]) => {
    const stepKeyNumber = parseInt(stepKey[stepKey.length - 1]);
    const nextStepKeyNumber = stepKeyNumber + 1;

    const stepElements = document.querySelectorAll(`[data-step-key="${stepKeyNumber}"]`);
    const nextStepElements = document.querySelectorAll(`[data-step-key="${nextStepKeyNumber}"]`);

    const passed = isComplete();

    window.stepperProgressStore.setStep(stepKey, passed);

    const updatedStoreData = window.stepperProgressStore.get();

    stepElements.forEach((stepElement) => {
      if (!stepElement) return;

      if (updatedStoreData[stepKey]) {
        stepElement.classList.add('stepper_item--active');
        stepElement.classList.remove('stepper_item--inactive');
      } else {
        stepElement.classList.remove('stepper_item--active');
        stepElement.classList.add('stepper_item--inactive');
      }

      if (Number(asideDataStepKeyNumber) === stepKeyNumber) {
        document.querySelectorAll('.button-highlight--right').forEach((btn) => {
          if (passed) {
            btn.removeAttribute('disabled');
            btn.classList.remove('button-highlight--disabled');
          } else {
            btn.setAttribute('disabled', true);
            btn.classList.add('button-highlight--disabled');
          }
        });
      }
    });

    nextStepElements.forEach((nextStepElement) => {
      if (!nextStepElement) return;

      if (passed) {
        nextStepElement.classList.add('stepper_item--clickable');
      } else {
        nextStepElement.classList.remove('stepper_item--clickable');
      }
    });
  });
}


export const setupStepperNavigation = () => {
  console.log('@setupStepperNavigation');
  window.updateStepperUI = updateStepperUI;
};

