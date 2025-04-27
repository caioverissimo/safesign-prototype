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