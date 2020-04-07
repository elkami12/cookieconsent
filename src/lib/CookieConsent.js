import ScriptTagFilter from './ScriptTagFilter';
import Interface from './Interface';
import Utilities from './Utilities';
import RemoveCookies from './RemoveCookies';

export default class CookieConsent {

    constructor() {
        this.buffer = {
            replaceTag: [],
        };
        this.config = {};
    }

    init(configObject) {

        const botRegex = /bot|crawler|spider|crawling/i;
        let isBot = botRegex.test(navigator.userAgent);

        this.setConfiguration(configObject, isBot);

        const removeCookies = new RemoveCookies();
        const scriptTagFilter = new ScriptTagFilter();

        removeCookies.init();
        scriptTagFilter.init();

        if (!isBot) {
            const UI = new Interface();

            UI.buildInterface(() => {
                UI.addEventListeners();
            });
        }
    }

    setConfiguration(configObject, botMode) {
        this.config = configObject;

        if (botMode) {
            // force all to checked and needed
            for (let key in this.config.categories) {
                if (this.config.categories.hasOwnProperty(key)) {
                    this.config.categories[key].checked = true;
                    this.config.categories[key].wanted = true;
                    this.config.categories[key].needed = true;
                }
            }
        } else {
            // The cookie overrides the default and user config
            this.cookieToConfig();
        }

        // We tell the world we did this
        Utilities.dispatchEvent(document, 'CCConfigSet');
    }

    cookieToConfig() { // jshint maxcomplexity: 20

        function removeReload() {
            Utilities.removeCookie();
            location.reload();
            return false;
        }

        let cookieDataStr = localStorage.getItem('cconsent');

        if (cookieDataStr == null || (typeof cookieDataStr === 'undefined')) {

            // find in cookies (old version)
            let docCookies = document.cookie.split(';');
            for (let cki = 0; cki < docCookies.length; cki++) {
                let item = docCookies[cki];

                if (item.indexOf('cconsent') >= 0) {
                    cookieDataStr = item.split('=')[1];
                }
            }

            if (!(cookieDataStr == null || (typeof cookieDataStr === 'undefined'))) {
                localStorage.setItem('cconsent', cookieDataStr);
            }
        }

        if (!(cookieDataStr == null || (typeof cookieDataStr === 'undefined'))) {
            var cookieData = JSON.parse(cookieDataStr);

            // We check cookie data expiration
            if (typeof cookieData.expiration !== 'undefined') {
                let dataExp = new Date();
                dataExp.setTime(cookieData.expiration);

                if (dataExp < (new Date())) {
                    return removeReload();
                }
            } else {
                // old version so add expiration
                let dt = new Date();
                dt = new Date(dt.setMonth(dt.getMonth() + 13));
                cookieData.expiration = dt.getTime();
                localStorage.setItem('cconsent', JSON.stringify(cookieData));
            }

            // We check cookie version. If older we need to renew cookie.
            if (typeof cookieData.version === 'undefined') {
                return removeReload();
            } else {
                if (cookieData.version !== this.config.cookieVersion) {
                    return removeReload();
                }
            }

            // We check if cookie data categories also exist in user config
            for (let key in cookieData.categories) {
                if (cookieData.categories.hasOwnProperty(key)) {
                    // The cookie contains category not present in user config so we invalidate cookie
                    if (typeof this.config.categories[key] === 'undefined') {
                        return removeReload();
                    }
                    this.config.categories[key].checked = this.config.categories[key].wanted = (cookieData.categories[key].wanted === true) ? true :
                        false;
                }
            }

            // We check if cookie data services also exist in user config

            for (let servi = 0; servi < cookieData.services.length; servi++) {
                let service = cookieData.services[servi];
                // The cookie contains service not present in user config so we invalidate cookie
                if (typeof this.config.services[service] === 'undefined') {
                    return removeReload();
                }
            }

            this.config.cookieExists = true;

            return true;
        }

        return false;
    }

}
