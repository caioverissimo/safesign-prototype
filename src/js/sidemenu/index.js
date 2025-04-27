export const toggleSideMenu = (showMenu) => {
  const sideMenu = $(`#sidemenu`);
  const sideMenuDisplay = sideMenu.css('display');
  console.log('sideMenuDisplay: ', sideMenuDisplay);

  if (typeof showMenu !== 'undefined') {
    const newDisplay = showMenu ? 'block' : 'none';
    sideMenu.css('display', newDisplay);
    return;
  }

  const newDisplay = sideMenuDisplay === 'block' ? 'none' : 'block';
  sideMenu.css('display', newDisplay);
};

export const setupSideMenu = () => {
  console.log('@setupSideMenu');

  window.toggleSideMenu = toggleSideMenu;
};