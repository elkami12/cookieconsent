export default class Utilities {

    static ready(fn) {
        if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    static objectType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    }

    static removeCookie() {
        document.cookie = `cconsent=; expires=Thu, 01 Jan 1980 00:00:00 UTC; path=/;`;
    }

    static dispatchEvent(elem, eventName) {
        let event;

        if (typeof(Event) === 'function') {
            event = new Event(eventName);
        } else {
            event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
        }

        elem.dispatchEvent(event);
    }

}
