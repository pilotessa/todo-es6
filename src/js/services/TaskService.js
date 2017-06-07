import appConstants from '../constants/appConstants';
import TaskLocalStorage from '../dao/TaskLocalStorage';

export default (function () {
    let _isInitialized,
        _storage,
        _data;

    function initialize() {
        return new Promise ((resolve, reject) => {
            if (!_isInitialized) {
                if (appConstants.storage == 'serverApi') {
                    _storage = TaskServerApi;
                } else {
                    _storage = TaskLocalStorage;
                }

                _storage.readData()
                .then (
                    data => {
                        _isInitialized = true;
                        _data = data;
                    },
                    reason => reject(reason)
                );
            }

            resolve();
        });
    }

    function getList() {
        if (!_isInitialized) {
            throw new Error('List is not initialized');
        }

        return _data.slice(0);
    }

    function createTask(task) {
        return new Promise ((resolve, reject) => {
            if (!_isInitialized) {
                reject('List is not initialized');
            }

            const i = _data.length;

            _data[i] = task;
            _storage.updateData(_data).
            then(
                () => resolve(_data[i].id),
                reason => reject(reason)
            );
        });
    }

    function getTask(id) {
        if (!_isInitialized) {
            throw new Error('List is not initialized');
        }

         for (let task of _data) {
            if (task.id === id) {
                return task;
            }
        }

        return null;
    }

    function updateTask(task) {
        return new Promise ((resolve, reject) => {
            if (!_isInitialized) {
                reject('List is not initialized');
            }

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].id === task.id) {
                    _data[i] = task;

                    resolve(_storage.updateData(_data));
                }
            }

            reject('Task is not found');
        });
    }

    function deleteTask(task) {
        return new Promise ((resolve, reject) => {
            if (!_isInitialized) {
                reject('List is not initialized');
            }

            for (let i = 0; i < _data.length; i++) {
                if (_data[i].id === task.id) {
                    _data.splice(i, 1);

                    resolve(_storage.updateData(_data));
                }
            }

            reject('Task is not found');
        });
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