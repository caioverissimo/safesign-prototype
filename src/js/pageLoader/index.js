import { pageSourceMapper } from './pageSourceMapper.js';

export const PageLoader = (() => {

  async function loadPageByEnum(pageEnum) {
    const url = pageSourceMapper[pageEnum];
    
    if (!url) {
      console.error(`❌ No path found for pageEnum: ${pageEnum}`);
      return;
    }

    const mainContainer = document.querySelector('#main');

    if (!mainContainer) {
      console.error('❌ No #app-container found');
      return;
    }

    try {
      await fadeOut(mainContainer);

      const response = await fetch(url);
      const html = await response.text();

      mainContainer.innerHTML = html;

      window.pageStore.set(pageEnum);
      fadeIn(mainContainer);
      console.log(`✅ Page loaded: ${pageEnum}`);
    } catch (error) {
      console.error(`❌ Failed to load page: ${pageEnum}`, error);
    }
  }

  function fadeOut(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;

    return new Promise(resolve => setTimeout(resolve, duration));
  }

  function fadeIn(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 1;
  }

  return {
    loadPageByEnum,
  };
})();