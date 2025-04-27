import { PageEnum } from '../data/enums.js';

export const pageRouteMapper = {
  // HOME_LOGGED_OUT: '/home',
  // HOME_LOGGED_IN: '/home-logged-in',
  // HOME_UNAUTHENTICATED: '/signup',
  [PageEnum.HOME_LOGGED_OUT]: '/home',
  [PageEnum.HOME_LOGGED_IN]: '/home-logged-in',
  [PageEnum.HOME_UNAUTHENTICATED]: '/signup',
};
