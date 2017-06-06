import TaskStatusEnum from '../models/TaskStatusEnum';

export default (function () {
    function getStaticContentOutput() {
        return `<ul class="todo-list list-group">
            <li class="todo-list-header list-group-item active">
            <input type="text" placeholder="What needs to be done?" autofocus="autofocus" class="todo-list-new-item-value form-control input-sm">
            </li>
            <li class="todo-list-footer list-group-item active form-inline">
            With selected:
            <select class="todo-list-batch-update form-control input-sm">
            <option value="">Choose action</option>
            <option value="delete">Delete</option>
            <option value="complete">Mark as complete</option>
            <option value="active">Mark as active</option>
            </select>
            <select class="todo-list-filter form-control input-sm">
            <option value="">Show all</option>
            <option value="active">Show active</option>
            <option value="complete">Show complete</option>
            </select>
            </li>
            </ul>`;
    }

    function getTaskOutput(task) {
        return `<li id="${task.id}" class="todo-list-item list-group-item ${task.status === TaskStatusEnum.ACTIVE_TASK ? 'list-group-item-warning' : 'list-group-item-success'}">
            <div>
            <span class="todo-list-title"><input type="checkbox" class="todo-list-item-check"${task.isChecked ? ' checked' : ''}>${task.value}</span>
            <span class="todo-list-item-delete glyphicon glyphicon-remove"></span>
            <span class="glyphicon ${task.status === TaskStatusEnum.ACTIVE_TASK ? 'glyphicon glyphicon-ok todo-list-item-mark-as-complete' : 'glyphicon glyphicon-repeat todo-list-item-mark-as-active'}"></span>
            </div>
            </li>`;
    }

    function getMessageOutput(message) {
        return `<div class="alert alert-success alert-dismissible fade" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            ${message}
            </div>`;
    }

    return {
        getStaticContentOutput,
        getTaskOutput,
        getMessageOutput
    }
})();