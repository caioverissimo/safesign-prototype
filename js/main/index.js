const toggleLoader = (state) => {
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



const main = async () => {
  console.log('@main');

  // $("#main-logo").load("components/main-logo.html"); 

  // toggleLoader();
  
  await delayByMs(500);
  navigation.goToHomeLoggedOut();

  toggleLoader();
};

// export default main;
// module.exports = main;