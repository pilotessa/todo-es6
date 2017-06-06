import appConstants from '../constants/appConstants';
import TaskLocalStorage from '../dao/TaskLocalStorage';

export default (function () {
    let _isInitialized,
        _storage,
        _data;

    function initialize(onSuccess) {
        if (!_isInitialized) {
            if (appConstants.storage == 'serverApi') {
                _storage = TaskServerApi;
            } else {
                _storage = TaskLocalStorage;
            }

            _storage.readData(
                data => {
                    _isInitialized = true;
                    _data = data;

                    onSuccess();
                },
                e => {
                    throw new Error(e.message);
                }
            );
        }
    }

    function getList() {
        if (!_isInitialized) {
            return;
        }

        return _data.slice(0);
    }

    function createTask(task) {
        if (!_isInitialized) {
            return;
        }

        const i = _data.length;

        _data[i] = task;
        _storage.updateData(_data);

        return _data[i].id;
    }

    function getTask(id) {
        if (!_isInitialized) {
            return;
        }

         for (let task of _data) {
            if (task.id === id) {
                return task;
            }
        }

        return null;
    }

    function updateTask(task) {
        if (!_isInitialized) {
            return;
        }

        for (let i = 0; i < _data.length; i++) {
            if (_data[i].id === task.id) {
                _data[i] = task;
                _storage.updateData(_data);

                return true;
            }
        }

        return false;
    }

    function deleteTask(task) {
        if (!_isInitialized) {
            return;
        }

        for (let i = 0; i < _data.length; i++) {
            if (_data[i].id === task.id) {
                _data.splice(i, 1);
                _storage.updateData(_data);

                return true;
            }
        }

        return false;
    }

    return {
        initialize,
        getList,
        createTask,
        getTask,
        updateTask,
        deleteTask
    }
})();