export default (function () {
    function hasClass(target, className) {
        return $(target).hasClass(className);
    }

    function addClass(target, className) {
        $(target).addClass(className);
    }

    function removeClass(target, className) {
        $(target).removeClass(className);
    }

    function getById(id) {
        const result  = $('#' + id);

        return result.length ? result[0] : null;
    }

    function getByClass(className, parent) {
        const result = $(parent).find('.' + className);

        return result.length ? result[0] : null;
    }

    function create(tag) {
        return $('<' + tag + '></' + tag + '>')[0];
    }

    function insertBefore(itemToInsert, target) {
        $(itemToInsert).insertBefore(target);
    }

    function setInnerHtml(target, content) {
        $(target).html(content);
    }

    function setOuterHtml(target, content) {
        $(target).prop('outerHTML', content);
    }

    function addListener(target, eventName, handler) {
        $(target).on(eventName, handler);
    }

    function removeListener(target, eventName, handler) {
        $(target).off(eventName, handler);
    }

    return {
        hasClass,
        addClass,
        removeClass,
        getById,
        getByClass,
        create,
        insertBefore,
        setInnerHtml,
        setOuterHtml,
        addListener,
        removeListener
    }
})();