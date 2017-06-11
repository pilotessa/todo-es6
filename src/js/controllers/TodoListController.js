import appConstants from '../constants/appConstants';
import Task from '../models/Task';
import TaskStatusEnum from '../models/TaskStatusEnum';
import DomService from '../services/DomService';
import TaskService from '../services/TaskService';
import TodoListView from '../views/TodoListView';

export default (function () {
    let $list,
        $newValue,
        $footer,
        $batchUpdate,
        $filter;

    function initialize(params = {}) {
        ({
            id: appConstants.id = appConstants.id,
            storage: appConstants.storage = appConstants.storage,
            engine: appConstants.engine = appConstants.engine
        } = params);

        // Init services
        DomService.initialize();
        TaskService.initialize()
        .then(
            () => {
                if (!$list) {
                    renderStaticContent(appConstants.id);
                    initStaticContentListeners();
                }

                loadList();
                filterList();
            },
            reason => {
                throw new Error(reason);
            }
        );
    }

    function renderStaticContent() {
        const $wrapper = DomService.getById(appConstants.id);

        if (!$wrapper) {
            throw new Error('List container is missing');
        }

        DomService.setInnerHtml($wrapper, TodoListView.getStaticContentOutput());

        $list = DomService.getByClass('todo-list', $wrapper);
        $newValue = DomService.getByClass('todo-list-new-item-value', $wrapper);
        $footer = DomService.getByClass('todo-list-footer', $wrapper);
        $batchUpdate = DomService.getByClass('todo-list-batch-update', $wrapper);
        $filter = DomService.getByClass('todo-list-filter', $wrapper);
    }

    function initStaticContentListeners() {
        DomService.addListener($newValue, 'keyup', onTaskCreate);
        DomService.addListener($list, 'click', onTaskUpdate);
        DomService.addListener($batchUpdate, 'change', onBatchUpdate);
        DomService.addListener($filter, 'change', onListFilter);
    }

    function onTaskCreate(event) {
        if (event.keyCode == 13) {
            const task = new Task();

            task.value = this.value;
            task.status = TaskStatusEnum.ACTIVE_TASK;
            task.isChecked = false;
            TaskService.createTask(task)
            .then(
                (id) => {
                    task.id = id;

                    renderTask(task);

                    if (canRenderMessage()) {
                        renderMessage('The task is successfully created.');
                    }

                    $newValue.value = '';
                },
                reason => {
                    throw new Error(reason);
                }
            );
        }
    }

    function onTaskUpdate(event) {
        if (DomService.hasClass(event.target, 'todo-list-item-check')) {
            const $li = DomService.getAncestor(event.target, 3),
                task = DomService.getAssignedData($li);

            task.isChecked = !task.isChecked;
            TaskService.updateTask(task);
        } else if (DomService.hasClass(event.target, 'todo-list-item-mark-as-complete')) {
            const $li = DomService.getAncestor(event.target, 2),
                task = DomService.getAssignedData($li);

            task.status = TaskStatusEnum.COMPLETED_TASK;
            TaskService.updateTask(task)
            .then(
                () => {
                    renderTask(task);

                    if (canRenderMessage()) {
                        renderMessage('The task is successfully updated.');
                    }
                },
                reason => {
                    throw new Error(reason);
                }
            );
        } else if (DomService.hasClass(event.target, 'todo-list-item-mark-as-active')) {
            const $li = DomService.getAncestor(event.target, 2),
                task = DomService.getAssignedData($li);

            task.status = TaskStatusEnum.ACTIVE_TASK;
            TaskService.updateTask(task)
            .then(
                () => {
                    renderTask(task);

                    if (canRenderMessage()) {
                        renderMessage('The task is successfully updated.');
                    }
                },
                reason => {
                    throw new Error(reason);
                }
            );
        } else if (DomService.hasClass(event.target, 'todo-list-item-delete')) {
            const $li = DomService.getAncestor(event.target, 2),
                task = DomService.getAssignedData($li);

            TaskService.deleteTask(task)
            .then(
                () => {
                    $list.removeChild($li);

                    if (canRenderMessage()) {
                        renderMessage('The task is successfully deleted.');
                    }
                },
                reason => {
                    throw new Error(reason);
                }
            );
        }
    }

    function onBatchUpdate() {
        const action = this.value,
            list = TaskService.getList();

        switch (action) {
            case 'delete':
                for (let task of list.filter(task => task.isChecked)) {
                    const $li = DomService.getById(task.id);

                    TaskService.deleteTask(task)
                    .then(
                        () => $list.removeChild($li),
                        reason => {
                            throw new Error(reason);
                        }
                    );
                }

                break;
            case 'complete':
                 for (let task of list.filter(task => task.isChecked)) {
                    task.status = TaskStatusEnum.COMPLETED_TASK;
                    task.isChecked = false;
                    TaskService.updateTask(task)
                    .then(
                        () => renderTask(task),
                        reason => {
                            throw new Error(reason);
                        }
                    );
                }

                break;
            case 'active':
                 for (let task of list.filter(task => task.isChecked)) {
                    task.status = TaskStatusEnum.ACTIVE_TASK;
                    task.isChecked = false;
                    TaskService.updateTask(task)
                    .then(
                        () => renderTask(task),
                        reason => {
                            throw new Error(reason);
                        }
                    );
                }

                break;
        }

        if (canRenderMessage()) {
            renderMessage('The list is successfully updated.');
        }

        this.value = '';
    }

    function onListFilter(event) {
        const filter = this.value;

        if (filter) {
            window.location.hash = '#' + filter;
        } else {
            history.replaceState({}, document.title, ".");
        }

        filterList();
    }

    function loadList() {
        const list = TaskService.getList();

        renderList(list);
    }

    function filterList() {
        const filter = window.location.hash.replace('#', '');

        DomService.removeClass($list, 'todo-list-filter-active');
        DomService.removeClass($list, 'todo-list-filter-complete');
        if (filter) {
            DomService.addClass($list, 'todo-list-filter-' + filter);
        }

        $filter.value = filter;
    }

    function renderList(list) {
        list.forEach(renderTask);
    }

    function renderTask(task) {
        let $li = DomService.getById(task.id),
            $liUpdated;

        if (!$li) {
            $li = DomService.create('li');
            DomService.insertBefore($li, $footer);
        }
        DomService.setOuterHtml($li, TodoListView.getTaskOutput(task));

        $liUpdated = DomService.getById(task.id);
        DomService.assignData($liUpdated, task);
    }

    function canRenderMessage() {
        return appConstants.engine == 'jQuery';
    }

    function renderMessage(message) {
        const $message = DomService.create('div');

        DomService.insertBefore($message, $list);
        DomService.setOuterHtml($message, TodoListView.getMessageOutput(message));

        setTimeout(() => $('.alert').addClass('in'));
        setTimeout(() => $('.alert').alert('close'), 1200);
    }

    function close() {
        closeTaskService();
        closeStaticContentListeners();
    }

    function closeTaskService() {
        DomService.removeListener(document, 'taskServiceInitialize', onServiceInitialize);
    }

    function closeStaticContentListeners() {
        DomService.removeListener($newValue, 'keyup', onTaskCreate);
        DomService.removeListener($list, 'click', onTaskUpdate);
        DomService.removeListener($batchUpdate, 'change', onBatchUpdate);
        DomService.removeListener($filter, 'change', onListFilter);
    }

    return {
        initialize,
        close
    }
})();