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

            for (let scriptTag of scriptTags) {
                let cat = searchCatsMap[scriptTag.dataset.consent];
                if (cat !== undefined) {
                    let newTag = document.createElement('script');
                    let parentNode = scriptTag.parentNode;

                    scriptTag.type = 'text/javascript';

                    for (let attribute of scriptTag.attributes) {
                        newTag.setAttribute(attribute.nodeName, attribute.nodeValue);
                    }

                    newTag.innerHTML = scriptTag.innerHTML;

                    if (window.cookieConsent.config.categories[cat].needed === true || window.cookieConsent.config.categories[cat].wanted === true) {
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
