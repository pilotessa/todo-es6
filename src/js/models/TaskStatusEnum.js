export default (function () {
    class TaskStatus {
        constructor(code, label) {
            this.code = code;
            this.label = label;
        }
    }

    const codes = new Map();
    codes.set('ACTIVE_TASK', new TaskStatus('ACTIVE_TASK', 'Active'));
    codes.set('COMPLETED_TASK', new TaskStatus('COMPLETED_TASK', 'Completed'));

    function getByCode(code) {
        if (codes.has(code)) {
            return codes.get(code);
        } else {
            throw new Error("Task Code is not found");
        }
    }

    return {
        ACTIVE_TASK: getByCode('ACTIVE_TASK'),
        COMPLETED_TASK: getByCode('COMPLETED_TASK'),
        getByCode
    }
})();