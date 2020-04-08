import Utilities from './Utilities';
import Filter from './Filter';

export default class ScriptTagFilter extends Filter {

    constructor() {
        super();
    }

    init() {
        this.filterTags();
    }

    filterTags() {
        Utilities.ready(() => {

            let searchCatsMap = super.createSearchCatsMap('script-tag');

            let scriptTags = document.querySelectorAll('script[type="text/plain"]');

            for (let tagi = 0; tagi < scriptTags.length; tagi++) {
                let scriptTag = scriptTags[tagi];
                let cat = searchCatsMap[scriptTag.dataset.consent];
                if (cat !== undefined) {
                    let newTag = document.createElement('script');
                    let parentNode = scriptTag.parentNode;

                    for (let aatri = 0; aatri < scriptTag.attributes.length; aatri++) {
                        let attribute = scriptTag.attributes[aatri];
                        newTag.setAttribute(attribute.nodeName, attribute.nodeValue);
                    }

                    newTag.innerHTML = scriptTag.innerHTML;
                    newTag.type = 'text/javascript';

                    let catCfg = window.cookieConsent.config.categories[cat];

                    if (catCfg.needed === true || catCfg.wanted === true) {
                        parentNode.insertBefore(newTag, scriptTag);
                        parentNode.removeChild(scriptTag);
                    } else {
                        window.cookieConsent.buffer.replaceTag.push({
                            'category': cat,
                            'parentNode': parentNode,
                            'oldTag': scriptTag,
                            'newTag': newTag
                        });
                    }
                }
            }
        });
    }
}
