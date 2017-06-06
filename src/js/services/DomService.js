import appConstants from '../constants/appConstants';
import DomUtilsJQuery from '../utils/DomUtilsJQuery';
import DomUtilsVanilla from '../utils/DomUtilsVanilla';

export default (function () {
    let _domUtils;

    function initialize() {
        if (appConstants.engine == 'jQuery') {
            _domUtils = DomUtilsJQuery;
        } else {
            _domUtils = DomUtilsVanilla;
        }
    }

    function hasClass(target, className) {
        return _domUtils.hasClass(target, className);
    }

    function addClass(target, className) {
        _domUtils.addClass(target, className);
    }

    function removeClass(target, className) {
        _domUtils.removeClass(target, className);
    }

    function getById(id) {
        return _domUtils.getById(id);
    }

    function getByClass(className, parent) {
        return _domUtils.getByClass(className, parent);
    }

    function create(tag) {
        return _domUtils.create(tag);
    }

    function insertBefore(itemToInsert, tagret) {
        _domUtils.insertBefore(itemToInsert, tagret);
    }

    function setInnerHtml(target, content) {
        _domUtils.setInnerHtml(target, content);
    }

    function setOuterHtml(target, content) {
        _domUtils.setOuterHtml(target, content);
    }

    function addListener(target, eventName, handler) {
        _domUtils.addListener(target, eventName, handler);
    }

    function removeListener(target, eventName, handler) {
        _domUtils.removeListener(target, eventName, handler);
    }

    return {
        initialize,
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