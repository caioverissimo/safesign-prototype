// import { createStepperProgressStore } from '../stores/stepperProgressStore.js';

// const stepperProgress = createStepperProgressStore();

// export function updateStepperClickableClasses() {
//   const progress = stepperProgress.get();

//   const steps = [
//     { stepKey: 'step1', element: document.querySelector('[data-step="1"]') },
//     { stepKey: 'step2', element: document.querySelector('[data-step="2"]') },
//     { stepKey: 'step3', element: document.querySelector('[data-step="3"]') },
//     { stepKey: 'step4', element: document.querySelector('[data-step="4"]') },
//   ];

//   steps.forEach((step, index) => {
//     const currentElement = step.element;
//     if (!currentElement) return;

//     // Always remove before checking
//     currentElement.classList.remove('stepper_item--clickable');

//     // Rule: if previous step is completed, allow this step to be clickable
//     if (index === 0 || progress[`step${index}`]) {
//       currentElement.classList.add('stepper_item--clickable');
//     }
//   });
// }

import { pageRouteMapper } from '../pageLoader/pageRouteMapper.js';
import { stepperNodeToPageMapper } from '../pageLoader/stepperNodeToPageMapper.js';
import { navigation } from '../pageLoader/navigation.js';
import { PageEnum } from '../data/enums.js';
import { delayByMs } from '../helpers/delayByMs.js';
import { renderUploadedDocs } from '../uploaddocs/index.js';

// export function setupStepperClickListeners() {
//   console.log('@setupStepperClickListeners');
  
//   const clickableSteps = document.querySelectorAll('.stepper_item--clickable');

//   clickableSteps.forEach((step) => {
//     console.log('@setupStepperClickListener - stepToAttachEvent: ' + step);
    
//     step.addEventListener('click', async () => {
//       const stepKey = step.getAttribute('data-step-key'); // Example: 'step1'
//       console.log('@setupStepperClickListeners | CLICKED | data-step-key' + stepKey);

//       if (stepKey && stepperNodeToPageMapper[stepKey]) {
//         const pageEnumKey = stepperNodeToPageMapper[stepKey]; // Example: UPLOAD_DOCS
//         const pagePath = pageRouteMapper[pageEnumKey]; // Example: '/upload-docs.html'

//         if (pagePath) {
//           await navigation().navigate(pagePath);
//         }
//       }
//     });
//   });
// }

// setupStepperClickListeners();


export const triggerClickableStepper = async (event) => {
  console.log('@triggerClickableStepper');
  console.log('@triggerClickableStepper | event: ', event);

  const stepperItem = event.target.closest('.stepper_item');
  console.log('@triggerClickableStepper | stepperItem: ', stepperItem);

  if (stepperItem.classList.value.includes('stepper_item--clickable')) {
    const dataStepKey = stepperItem.getAttribute('data-step-key'); // Example: 'step1'
    const stepKey = `step${dataStepKey}`;
      console.log('@setupStepperClickListeners | CLICKED | data-step-key' + stepKey);

      if (stepKey && stepperNodeToPageMapper[stepKey]) {
        const pageEnumKey = stepperNodeToPageMapper[stepKey]; // Example: UPLOAD_DOCS
        // const pagePath = pageRouteMapper[pageEnumKey]; // Example: '/upload-docs.html'

        // if (pagePath) {
        //   await navigation().navigate(pagePath);
        // }

        if (pageEnumKey) {
          await navigation().navigate(pageEnumKey);

          if (pageEnumKey === PageEnum.UPLOAD_DOCS) {
            await delayByMs(3000);

            renderUploadedDocs();
          }
        }
      }

  }

};


