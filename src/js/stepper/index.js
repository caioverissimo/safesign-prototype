import { stepperNodeToPageMapper } from '../pageLoader/stepperNodeToPageMapper.js';
import { navigation } from '../pageLoader/navigation.js'; // or where you defined it
import { delayByMs } from '../helpers/delayByMs.js';
// import {updateStepperClickableClasses} from './updateStepperVisual.js'
// import { setupStepperClickListeners } from './stepperClickable.js'
import { triggerClickableStepper } from './triggerClickableStepper.js'

export const onStepperClick = (stepKey) =>  {
  const pageEnum = stepToPageMapper[stepKey];

  if (pageEnum) {
    navigation().navigate(pageEnum);
  } else {
    console.error('No page mapped for step:', stepKey);
  }
}

export const setupStepper = async () => { 
  console.log('@setupStepper');
  
  // updateStepperClickableClasses();

  // await delayByMs(5000);
  // setupStepperClickListeners();
  window.triggerClickableStepper = triggerClickableStepper;
};
