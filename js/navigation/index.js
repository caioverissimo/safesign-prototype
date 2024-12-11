const pages = {
  cover: 'cover',
  homeLoggedOut: 'home-logged-out',
  homeLoggedIn: 'home-logged-in'
};

const navigation = {
  updatePage: (pageAlias) => {
    if (pageAlias) {
      const appContainer = $("#app-container");
      $("#app-container").attr('page', pageAlias);

      appContainer.load(`pages/${pageAlias}/${pageAlias}.html`)
      console.log(`page has changed to: @${pageAlias}`)
      console.log("Updated page attribute to:", $("#app-container").attr("page"));
    }
  },
  goToCover: () => {
    console.log('@goToCover')
    navigation.updatePage(pages.Cover);
  },
  goToHomeLoggedOut: () => {
    console.log('@goToHomeLoggedOut');
    console.log('pages.homeLoggedOut: ', pages.homeLoggedOut);
    navigation.updatePage(pages.homeLoggedOut);
  },
  goToHomeLoggedIn: () => {
    console.log('@goToHomeLoggedIn');
    navigation.updatePage(pages.homeLoggedIn);
  },
};  