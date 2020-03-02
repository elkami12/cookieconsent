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

        this.setConfiguration(configObject);

        const removeCookies = new RemoveCookies();
        const scriptTagFilter = new ScriptTagFilter();

        removeCookies.init();
        scriptTagFilter.init();

        const UI = new Interface();

        UI.buildInterface(() => {
            UI.addEventListeners();
        });
    }

    setConfiguration(configObject) {
        this.config = configObject;

        // The cookie overrides the default and user config
        this.cookieToConfig();

        // We tell the world we did this
        Utilities.dispatchEvent(document, 'CCConfigSet');
    }

    cookieToConfig() {

        function removeReload() {
            Utilities.removeCookie();
            location.reload();
            return false;
        }

        document.cookie.split(';').filter((item) => {

            if (item.indexOf('cconsent') >= 0) {
                var cookieData = JSON.parse(item.split('=')[1]);

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
                for (let service of cookieData.services) {
                    // The cookie contains service not present in user config so we invalidate cookie
                    if (typeof this.config.services[service] === 'undefined') {
                        return removeReload();
                    }
                }

                this.config.cookieExists = true;
                return true;
            }
        });

        return false;
    }

}
