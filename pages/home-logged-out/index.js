const homeLoggedOut = () => {

  console.log('@rendering homeLoggedOut!');
  const appContainer = $("#app-container");

  // appContainer.load(`components/main-logo.html`)
  const mainLogo = $("#main-logo");
  mainLogo.load(`components/main-logo.html`)
};


homeLoggedOut();