import Utilities from './Utilities';

export default class Filter {

    createBlacklist(type) {

        let blacklist = [];

        let confCats = window.cookieConsent.config.categories;
        let confServices = window.cookieConsent.config.services;

        for (let serviceKey in confServices) {
            if (confServices.hasOwnProperty(serviceKey)) {
                let confService = confServices[serviceKey];
                if (confService.type === type && confCats[confService.category].needed === false && confCats[confService.category].wanted === false) {
                    let searchType = Utilities.objectType(confService.search);
                    if (searchType === 'String') {
                        blacklist.push(confService.search);
                    } else if (searchType === 'Array') {
                        for (let i = 0; i < confService.search.length; i++) {
                            blacklist.push(confService.search[i]);
                        }
                    }
                }
            }
        }

        return blacklist;
    }

    createSearchCatsMap(type) {
        let searchCats = {};
        let confServices = window.cookieConsent.config.services;

        for (let serviceKey in confServices) {
            if (confServices.hasOwnProperty(serviceKey)) {
                let confService = confServices[serviceKey];
                if (confService.type === type) {
                    let searchType = Utilities.objectType(confService.search);
                    if (searchType === 'String') {
                        searchCats[confService.search] = confService.category;
                    } else if (searchType === 'Array') {
                        for (let i = 0; i < confService.search.length; i++) {
                            searchCats[confService.search[i]] = confService.category;
                        }
                    }
                }
            }
        }

        return searchCats;
    }

}
