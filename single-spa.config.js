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
  'home',
  () => import('./src/home/home.app'),
  pathPrefix('/home')
);

registerApplication(
  'vue',
  () => import('./src/vue/src/main.js'),
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