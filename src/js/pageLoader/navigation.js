import { pageSourceMapper } from './pageSourceMapper.js';
import { pageRouteMapper } from './pageRouteMapper.js';
import { PageLoader } from '../pageLoader/index.js'; 

export function navigation() {
  async function navigate(pageEnumKey) {
    const pagePath = pageSourceMapper[pageEnumKey];
    const routePath = pageRouteMapper[pageEnumKey];

    if (!pagePath || !routePath) {
      console.error(`Page or route not found for: ${pageEnumKey}`);
      return;
    }

    await PageLoader.loadPageByEnum(pagePath);
    window.history.pushState({ page: pageEnumKey }, '', routePath);

    window.pageStore.set(pageEnumKey);
  }

  function getRoute(pageEnumKey) {
    return pageRouteMapper[pageEnumKey] || null;
  }

  return {
    navigate,
    getRoute
  };
}
