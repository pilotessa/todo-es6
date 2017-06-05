import localStorageConstants from '../constants/localStorageConstants';
import Task from '../models/Task';

export default (function () {
    var TASKS_KEY = localStorageConstants.TASK_LIST;

    function readData(onSuccess, onError) {
        try {
            var taskListStringified = localStorage.getItem(TASKS_KEY) || "[]",
                taskList = JSON.parse(taskListStringified.trim());

            taskList = Array.isArray(taskList) ? taskList : [taskList];

            var data = taskList.map(function (taskJson) {
                return new Task().fromJSON(taskJson);
            });

            if (onSuccess) {
                onSuccess(data);
            }
        } catch (e) {
            if (onError) {
                onError(e);
            }
        }
    }

    function updateData(data, onSuccess, onError) {
        try {
            var taskListJson = data.map(function (task) {
                if (!task.id) {
                    task.id = '_' + Math.random().toString(36).substr(2, 9);
                }

                return task.toJSON();
            }),
            taskListStringified = JSON.stringify(taskListJson);

            localStorage.setItem(TASKS_KEY, taskListStringified);

            if (onSuccess) {
                onSuccess(data);
            }
        } catch (e) {
            if (onError) {
                onError(e);
            }
        }
    }

    return {
        readData: readData,
        updateData: updateData
    }
})();