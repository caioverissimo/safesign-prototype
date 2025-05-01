// TODO: check for move this to its on 'stepper' folder
export function updateStepperVisual() {
  console.log('[updateStepperVisual] Running...');

  const stepProgress = window.stepProgress; // assuming you made it global
  const progress = stepProgress.get();

  document.querySelectorAll('.stepper_item').forEach((item, index) => {
    const stepKey = `step${index + 1}`; // step1, step2, etc.

    if (progress[stepKey]) {
      item.classList.add('stepper_item--active');
      item.classList.remove('stepper_item--inactive');
    } else {
      item.classList.remove('stepper_item--active');
      item.classList.add('stepper_item--inactive');
    }
  });
}