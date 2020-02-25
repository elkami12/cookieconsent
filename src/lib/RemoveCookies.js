import Utilities from './Utilities';

export default class RemoveCookies {

    init() {
        this.removeUnwantedCookies();
    }

    removeUnwantedCookies() {
        let cookieList = [];

        let configCats = window.cookieConsent.config.categories;
        let configServices = window.cookieConsent.config.services;

        document.cookie.split(';').map(function(a) {
            cookieList.push(a.split('=')[0].replace(/(^\s*)|(\s*&)/, ''));
        });

        /*jshint -W073 */
        for (let serviceKey in configServices) {
            if (configServices.hasOwnProperty(serviceKey)) {
                let confService = configServices[serviceKey];
                if (Utilities.objectType(confService.cookies) === 'Array' &&
                    !configCats[confService.category].wanted) {
                    // Remove cookies if they are not wanted by user
                    for (let cookieDef of confService.cookies) {
                        let type = Utilities.objectType(cookieDef.name);
                        if (type === 'String') {
                            if (cookieList.indexOf(cookieDef.name) > -1) {
                                this.removeCookie(cookieDef);
                            }
                        } else if (type === 'RegExp') {
                            // Searching cookie list for cookies matching specified RegExp
                            for (let cookieName in cookieList) {
                                if (cookieDef.name.test(cookieName)) {
                                    this.removeCookie({
                                        name: cookieName,
                                        domain: cookieDef.domain
                                    });
                                }
                            }
                        }

                    }
                }
            }
        }
        /*jshint +W073 */
    }

    removeCookie(cookieDef) {
        // Removing cookies from domain and .domain
        let domain = Utilities.objectType(cookieDef.domain) === 'String' ? `domain=${cookieDef.domain};` : '';
        document.cookie = `${cookieDef.name}=; expires=Thu, 01 Jan 1980 00:00:00 UTC; ${domain} path=/;`;
    }
}
