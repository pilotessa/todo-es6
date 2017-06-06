import localStorageConstants from '../constants/localStorageConstants';
import Task from '../models/Task';

export default (function () {
    const TASKS_KEY = localStorageConstants.TASK_LIST;

    function readData(onSuccess, onError) {
        try {
            const taskListStringified = localStorage.getItem(TASKS_KEY) || "[]",
                taskListParsed = JSON.parse(taskListStringified.trim()),
                taskList = Array.isArray(taskListParsed) ? taskListParsed : [taskListParsed],
                data = taskList.map(taskJson => new Task().fromJSON(taskJson));

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
            const taskListJson = data.map(task => {
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
        readData,
        updateData
    }
})();