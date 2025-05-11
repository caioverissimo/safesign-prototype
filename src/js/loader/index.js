import { delayByMs } from '../helpers/delayByMs.js';

export const toggleLoader = (state) => {
  console.log('@toggleLoader');
  const loaderState = $("#overlay").css('display');

  if (state) {
    const newDisplayValue = !!state ? 'none' : 'flex';
    console.log('newDisplayValue: ', newDisplayValue);
    return $("#overlay").css('display', newDisplayValue);
  }

  if (loaderState !== 'none') {
    console.log('loaderState: ', loaderState);
    return $("#overlay").css('display', 'none');

  }

  console.log('loaderState: ', loaderState);
  return $("#overlay").css('display', 'flex');
};

// export const simulateLoading = async ({ intervalInMs, callbackFn }) => {
//   console.log('@simulateLoading');

//   toggleLoader();
  
//   if (typeof callbackFn === 'function') {
//     callbackFn();
//   }

//   await delayByMs(intervalInMs || 1000);

//   toggleLoader();
// };
export const simulateLoading = async (intervalInMs, callbackFn) => {
  console.log('@simulateLoading');

  toggleLoader();
  
  await delayByMs(intervalInMs || 1000);

  if (typeof callbackFn === 'function') {
    callbackFn();
  }


  toggleLoader();
};

export const setupLoader = () => {
  console.log('@setupLoader');
  
  window.simulateLoading = simulateLoading;
};