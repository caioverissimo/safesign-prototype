import { pageRouteMapper } from '../pageLoader/pageRouteMapper.js';
import { stepperNodeToPageMapper } from '../pageLoader/stepperNodeToPageMapper.js';
import { navigation } from '../pageLoader/navigation.js';
import { PageEnum } from '../data/enums.js';
import { delayByMs } from '../helpers/delayByMs.js';
import { renderUploadedDocs } from '../uploaddocs/index.js';


export const triggerClickableStepper = async (event) => {
  console.log('@triggerClickableStepper');
  console.log('@triggerClickableStepper | event: ', event);

  const stepperItem = event.target.closest('.stepper_item');
  console.log('@triggerClickableStepper | stepperItem: ', stepperItem);

  if (stepperItem.classList.value.includes('stepper_item--clickable')) {
    const dataStepKey = stepperItem.getAttribute('data-step-key');
    const stepKey = `step${dataStepKey}`;
      console.log('@setupStepperClickListeners | CLICKED | data-step-key' + stepKey);

      if (stepKey && stepperNodeToPageMapper[stepKey]) {
        const pageEnumKey = stepperNodeToPageMapper[stepKey];

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


