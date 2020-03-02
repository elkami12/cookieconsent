import { el, mount } from 'redom';
import Language from './Language';
import Utilities from './Utilities';

export default class Interface {

    constructor() {
        this.elements = {};
    }

    buildBar() {

        return el('div#cconsent-bar.ccm__modal.ccm--hidden',
            el('a.ccm__bg.cc__consent-give', '\xa0'),
            el('div.ccm__content',
                el('div.ccm__content__heading',
                    el('h2', Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'barMainTitle'))
                ),
                el('div.ccm__content__body',
                    el('div.ccm__content_text',
                        el('p.bold.emphasize', Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'barMainTextStrong')),
                        el('p',
                            Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'barMainText'),
                            el('a.grey-color.ccb__edit', Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'barLinkSetting')),
                            Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'barMainText2'),
                            el('a.grey-color.cc__consent-give', {
                                    href: window.cookieConsent.config.modalMainTextMoreLink,
                                    rel: 'noopener noreferrer'
                                },
                                Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'barLearnMore')),
                            Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'barMainText3')
                        )
                    )
                ),
                el('div.ccm__footer',
                    el('button.btn.btn-primary.btn-block.btn-lg.cc__consent-give',
                        Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'barBtnAcceptAll'),
                        el('br.visible-xs-block'),
                        Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'barBtnAcceptAll2')
                    )
                )
            )
        );
    }

    buildModal() {

        // Cookie names list middleware
        var listCookies = function(category) {
            var list = [];

            let servs = window.cookieConsent.config.services;
            for (let service in servs) {
                if (servs.hasOwnProperty(service)) {
                    if (servs[service].category === category) {
                        list.push(servs[service]);
                    }
                }
            }

            if (list.length) {

                var listItems = [];

                for (let item in list) {
                    if (list.hasOwnProperty(item)) {
                        listItems.push(el('li', Language.getTranslation(list[item], window.cookieConsent.config.language.current, 'name')));
                    }
                }

                return [el('div.ccm__list', el('span.ccm__list__title', Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current,
                    'modalAffectedSolutions')), el('ul', listItems))];
            }
        };

        function modalTabGroups() {

            let contentItems = [];

            let i = 0;
            let cats = window.cookieConsent.config.categories;
            for (let key in cats) {
                if (cats.hasOwnProperty(key)) {
                    contentItems.push(el('dl.ccm__tabgroup' + '.' + key + ((cats[key].checked) ? '.ccm__tabgroup--checked' : ''), {
                            'data-category': key
                        },
                        el('dt.ccm__tab-head', Language.getTranslation(cats[key], window.cookieConsent.config.language.current, 'name'),
                            el('a.ccm__tab-head__icon-wedge',
                                el(document.createElementNS('http://www.w3.org/2000/svg', 'svg'), {
                                        version: '1.2',
                                        preserveAspectRatio: 'none',
                                        viewBox: '0 0 24 24',
                                        class: 'icon-wedge-svg',
                                        'data-id': 'e9b3c566e8c14cfea38af128759b91a3',
                                        style: 'opacity: 1; mix-blend-mode: normal; fill: rgb(51, 51, 51); width: 32px; height: 32px;'
                                    },
                                    el(document.createElementNS('http://www.w3.org/2000/svg', 'path'), {
                                        'xmlns:default': 'http://www.w3.org/2000/svg',
                                        class: 'icon-wedge-angle-down',
                                        d: 'M17.2,9.84c0-0.09-0.04-0.18-0.1-0.24l-0.52-0.52c-0.13-0.13-0.33-0.14-0.47-0.01c0,0-0.01,0.01-0.01,0.01  ' +
                                            'l-4.1,4.1l-4.09-4.1C7.78,8.94,7.57,8.94,7.44,9.06c0,0-0.01,0.01-0.01,0.01L6.91,9.6c-0.13,0.13-0.14,0.33-0.01,0.47  ' +
                                            'c0,0,0.01,0.01,0.01,0.01l4.85,4.85c0.13,0.13,0.33,0.14,0.47,0.01c0,0,0.01-0.01,0.01-0.01l4.85-4.85c0.06-0.06,0.1-0.15,0.1-0.24  ' +
                                            'l0,0H17.2z',
                                        style: 'fill: rgb(51, 51, 51);'
                                    })
                                )
                            )
                        ),
                        el('dd.ccm__tab-content',
                            el('div.ccm__tab-content__left',
                                (!cats[key].needed) && el('div.ccm__switch-component', el('div.status-off', Language.getTranslation(window.cookieConsent.config,
                                        window.cookieConsent.config.language.current, 'off')),
                                    el('div.ccm__switch-group',
                                        el('label.ccm__switch',
                                            el('input.category-onoff', {
                                                type: 'checkbox',
                                                'data-category': key,
                                                'checked': cats[key].checked
                                            }),
                                            el('span.ccm__switch__slider')
                                        )
                                    ),
                                    el('div.status-on', Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'on')))
                            ),
                            el('div.right',
                                el('h3', Language.getTranslation(cats[key], window.cookieConsent.config.language.current, 'name')),
                                el('p', Language.getTranslation(cats[key], window.cookieConsent.config.language.current, 'description')),
                                el('div.ccm__list',
                                    listCookies(key)
                                )
                            )
                        )
                    ));

                    i++;
                }
            }

            return contentItems;
        }

        return el('div#cconsent-modal.ccm__modal',
            el('div.ccm__bg', '\xa0'),
            el('div.ccm__content',
                el('div.ccm__content__heading',
                    el('h2', Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'modalMainTitle'))
                ),
                el('div.ccm__content__body',
                    el('div.ccm__content_text',
                        el('p',
                            Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'modalMainText')
                        ),
                        el('p',
                            Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'modalMainText2')
                        ),
                        el('p',
                            el('a.cc__consent-give', {
                                    href: window.cookieConsent.config.modalMainTextMoreLink,
                                    rel: 'noopener noreferrer'
                                },
                                Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current, 'modalLearnMore'))
                        )
                    ),
                    el('div.ccm__tabs',
                        modalTabGroups()
                    )
                ),
                el('div.ccm__footer',
                    el('button.btn.btn-default.ccm__btnlg.ccm__save#ccm__footer__consent-modal-submit', Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language
                        .current,
                        'modalBtnSave')),
                    el('button.btn.btn-primary.ccm__btnlg.cc__consent-give', Language.getTranslation(window.cookieConsent.config, window.cookieConsent.config.language.current,
                        'modalBtnAcceptAll'))
                )
            )
        );
    }

    modalRedrawIcons() {
        var tabGroups = this.elements['modal'].querySelectorAll('.ccm__tabgroup');

        for (let tabGroup of tabGroups) {
            if (window.cookieConsent.config.categories[tabGroup.dataset.category].checked) {
                if (!tabGroup.classList.contains('ccm__tabgroup--checked')) {
                    tabGroup.classList.add('ccm__tabgroup--checked');
                    tabGroup.querySelector('input.category-onoff').checked = true;
                }
            } else {
                if (tabGroup.classList.contains('ccm__tabgroup--checked')) {
                    tabGroup.classList.remove('ccm__tabgroup--checked');
                }
                tabGroup.querySelector('input.category-onoff').checked = false;
            }
        }
    }

    render(name, elem, callback) {
        if (typeof callback === 'undefined') {
            callback = function() {};
        }
        if (typeof this.elements[name] !== 'undefined') {
            this.elements[name].parentNode.replaceChild(elem, this.elements[name]);
            this.elements[name] = elem;
            callback(elem);
            return elem;
        } else {
            var insertedElem = mount(document.body, elem);
            if (insertedElem) {
                this.elements[name] = insertedElem;
            }
            callback(insertedElem);
            return insertedElem;
        }
    }

    buildInterface(callback) {

        if (typeof callback === 'undefined') {
            callback = function() {};
        }
        var that = this;

        Utilities.ready(function() {

            that.render('bar', that.buildBar(), (bar) => {

                // Show the bar after a while
                if (!window.cookieConsent.config.cookieExists) {
                    setTimeout(() => {
                        bar.classList.remove('ccm--hidden');
                    }, window.cookieConsent.config.barTimeout);
                }
            });

            that.render('modal', that.buildModal());

            callback();
        });
    }

    addEventListeners(elements) {
        // If you click Accept all cookies
        var buttonConsentGive = document.querySelectorAll('.cc__consent-give');

        for (let button of buttonConsentGive) {
            button.addEventListener('click', () => {

                let cats = window.cookieConsent.config.categories;
                // We set config to full consent
                for (let key in cats) {
                    if (cats.hasOwnProperty(key)) {
                        cats[key].wanted =
                            cats[key].checked = true;
                    }
                }

                this.writeBufferToDOM();

                this.buildCookie((cookie) => {
                    this.setCookie(cookie);
                });

                this.elements['bar'].classList.add('ccm--hidden');
                this.elements['modal'].classList.remove('ccm--visible');

                this.modalRedrawIcons();

            });
        }

        // If you click Cookie settings and open modal
        Array.prototype.forEach.call(document.getElementsByClassName('ccb__edit'), (edit) => {
            edit.addEventListener('click', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();

                this.elements['bar'].classList.add('ccm--hidden');
                this.elements['modal'].classList.add('ccm--visible');
            });
        });

        function getDlParent(eventTarget) {
            var parent = eventTarget.parentNode;
            if (parent.nodeName !== 'DL') {
                return getDlParent(parent);
            } else {
                return parent;
            }
        }

        // If you click trough the tabs on Cookie settings
        // If you click on/off switch
        this.elements['modal'].querySelector('.ccm__tabs').addEventListener('click', (event) => {

            // If you click trough the tabs on Cookie settings
            if (event.target.classList.contains('ccm__tab-head') || event.target.classList.contains('ccm__tab-head__icon-wedge')) {

                var parentDl = getDlParent(event.target);

                if (parentDl.classList.contains('ccm__tabgroup--open')) {
                    parentDl.classList.remove('ccm__tabgroup--open');
                } else {
                    parentDl.classList.add('ccm__tabgroup--open');
                }
            }

            // If you click on/off switch
            if (event.target.classList.contains('category-onoff')) {

                let cats = window.cookieConsent.config.categories;
                let eventCat = event.target.dataset.category;
                cats[eventCat].wanted =
                    cats[eventCat].checked = (event.target.checked === true) ? true : false;

                var dt = document.querySelector('.ccm__tabgroup.' + eventCat);
                if (event.target.checked === false && dt.classList.contains('ccm__tabgroup--checked')) {
                    dt.classList.remove('ccm__tabgroup--checked');
                } else {
                    dt.classList.add('ccm__tabgroup--checked');
                }
            }
        });

        // If you click submit on cookie settings
        document.getElementById('ccm__footer__consent-modal-submit').addEventListener('click', () => {

            let switchElements = this.elements['modal'].querySelectorAll('.ccm__switch input');

            Array.prototype.forEach.call(switchElements, (switchElement) => {
                window.cookieConsent.config.categories[switchElement.dataset.category].wanted = switchElement.checked;
            });

            this.buildCookie((cookie) => {
                this.setCookie(cookie, () => {
                    this.elements['modal'].classList.remove('ccm--visible');
                    this.elements['bar'].classList.add('ccm--hidden');
                });
            });

            this.writeBufferToDOM();

        });
    }

    writeBufferToDOM() {

        let action;
        let newReplaceTagArr = [];

        for (let i = 0; i < window.cookieConsent.buffer.replaceTag.length; i++) {
            action = window.cookieConsent.buffer.replaceTag[i];
            if (window.cookieConsent.config.categories[action.category].wanted === true) {
                Node.prototype.insertBefore.apply(action.parentNode, [action.newTag, action.oldTag]);
                Node.prototype.removeChild.apply(action.parentNode, [action.oldTag]);
            } else {
                newReplaceTagArr.push(action);
            }
        }
        window.cookieConsent.buffer.replaceTag = newReplaceTagArr;

    }

    buildCookie(callback) {
        let cookie = {
            version: window.cookieConsent.config.cookieVersion,
            categories: {},
            services: []
        };

        let confCats = window.cookieConsent.config.categories;
        for (let key in confCats) {
            if (confCats.hasOwnProperty(key)) {
                cookie.categories[key] = {
                    wanted: confCats[key].wanted
                };
            }
        }

        let confServices = window.cookieConsent.config.services;
        for (let key in confServices) {
            if (confServices.hasOwnProperty(key)) {
                cookie.services.push(key);
            }
        }

        if (callback) {
            callback(cookie);
        }
        return cookie;
    }

    setCookie(cookie, callback) {
        document.cookie = `cconsent=${JSON.stringify(cookie)}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/;`;
        if (callback) {
            callback();
        }
    }
}
