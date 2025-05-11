import { pageSourceMapper } from '../pageLoader/pageSourceMapper.js';
import { PageLoader } from '../pageLoader/index.js';

export function navigation() {
  async function navigate(pageEnumKey) {
    const pagePath = pageSourceMapper[pageEnumKey];

    if (!pagePath) {
      console.error(`❌ No path found for page: ${pageEnumKey}`);
      return;
    }

    await PageLoader.loadPageByEnum(pageEnumKey);
    window.location.hash = pageEnumKey; // Set URL hash
    window.pageStore.set(pageEnumKey);
  }

  function getRoute() {
    const hash = window.location.hash.slice(1); // Remove the "#"
    return hash || null;
  }

  return {
    navigate,
    getRoute,
  };
}

// ATTENTION: this is the pushState approach using routing
// for this, we need to use a server
// import { pageSourceMapper } from './pageSourceMapper.js';
// import { pageRouteMapper } from './pageRouteMapper.js';
// import { PageLoader } from '../pageLoader/index.js'; 


// export function navigation() {
//   async function navigate(pageEnumKey) {
//     const pagePath = pageSourceMapper[pageEnumKey];
//     const routePath = pageRouteMapper[pageEnumKey];

//     if (!pagePath || !routePath) {
//       console.error(`Page or route not found for: ${pageEnumKey}`);
//       return;
//     }

//     await PageLoader.loadPageByEnum(pagePath);
//     window.history.pushState({ page: pageEnumKey }, '', routePath);

//     window.pageStore.set(pageEnumKey);
//   }

//   function getRoute(pageEnumKey) {
//     return pageRouteMapper[pageEnumKey] || null;
//   }

//   return {
//     navigate,
//     getRoute
//   };
// }
