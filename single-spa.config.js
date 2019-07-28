import {
  registerApplication,
  start
} from 'single-spa'

registerApplication(
  'navBar',
  () => import('./src/navBar/navBar.app.js').then(module => module.navBar),
  () => true
);

registerApplication(
  // Name of our single-spa application
  'home',
  // loadingFunction
  () => import('./src/home/home.app'),
  // activityFunction
  pathPrefix('/home')
);

registerApplication(
  // Name of our single-spa application
  'vue',
  // loadingFunction
  () => import('./src/test/src/main.js'),
  // activityFunction
  pathPrefix('/vue')
);

function pathPrefix(prefix) {
  return function (location) {
    if (prefix === '/home') {
      return location.pathname === "" ||
        location.pathname === "/" ||
        location.pathname.startsWith('/home')
    } else {
      return location.pathname.startsWith(prefix);
    }
  }
}


start();