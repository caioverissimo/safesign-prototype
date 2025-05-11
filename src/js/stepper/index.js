import { stepperNodeToPageMapper } from '../pageLoader/stepperNodeToPageMapper.js';
import { navigation } from '../pageLoader/navigation.js';
import { delayByMs } from '../helpers/delayByMs.js';

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
  
  window.triggerClickableStepper = triggerClickableStepper;
};
