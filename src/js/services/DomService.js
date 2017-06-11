import appConstants from '../constants/appConstants';
import DomUtilsJQuery from '../utils/DomUtilsJQuery';
import DomUtilsVanilla from '../utils/DomUtilsVanilla';

export default (function () {
    const _data = new WeakMap();
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

    function getParent(target) {
        return _domUtils.getParent(target);
    }

    function getAncestor(target, level) {
        let a = target;

        for (let i = 1; i <= level; i++) {
            a = _domUtils.getParent(a);

            if (!a) {
                return null;
            }
        }

        return a;
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

    function assignData($li, task) {
        _data.set($li, task);
    }

    function getAssignedData($li) {
        return _data.get($li);
    }

    return {
        initialize,
        hasClass,
        addClass,
        removeClass,
        getById,
        getByClass,
        getParent,
        getAncestor,
        create,
        insertBefore,
        setInnerHtml,
        setOuterHtml,
        addListener,
        removeListener,
        assignData,
        getAssignedData
    }
})();