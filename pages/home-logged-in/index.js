const homeLoggedIn = () => {

  console.log('@rendering homeLoggedIn!');
  const appContainer = $("#app-container");

  const mainPicture = $("#main-picture");
  mainPicture.load(`components/main-picture.html`)
};

homeLoggedIn();