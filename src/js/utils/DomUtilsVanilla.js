export default (function () {
    function hasClass(target, className) {
        return target.className.indexOf(className) != -1;
    }

    function addClass(target, className) {
        target.className += (target.className ? ' ' : '') + className;
    }

    function removeClass(target, className) {
        const rx = new RegExp('(' + className + ')?', 'g');

        target.className = target.className.replace(rx, '');
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function getByClass(className, parent) {
        const result = parent.getElementsByClassName(className);

        return result.length ? result[0] : null;
    }

    function getParent(target) {
        return target.parentNode || null;
    }

    function create(tag) {
        return document.createElement(tag);
    }

    function insertBefore(itemToInsert, target) {
        const parent = target.parentNode;

        parent.insertBefore(itemToInsert, target);
    }

    function setInnerHtml(target, content) {
        target.innerHTML = content;
    }

    function setOuterHtml(target, content) {
        target.outerHTML = content;
    }

    function addListener(target, eventName, handler) {
        target.addEventListener(eventName, handler, false);
    }

    function removeListener(target, eventName, handler) {
        target.removeEventListener(eventName, handler, false);
    }

    return {
        hasClass,
        addClass,
        removeClass,
        getById,
        getByClass,
        getParent,
        create,
        insertBefore,
        setInnerHtml,
        setOuterHtml,
        addListener,
        removeListener
    }
})();