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
