import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import CookieConsent from './lib/CookieConsent';

const cookieConsent = new CookieConsent();

window.cookieConsent = cookieConsent;
