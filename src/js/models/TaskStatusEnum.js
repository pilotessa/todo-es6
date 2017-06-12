export default (function () {
    class TaskStatus {
        constructor(code, label) {
            this.code = code;
            this.label = label;
        }
    }

    const ACTIVE_TASK = new TaskStatus('ACTIVE_TASK', 'Active');
    const COMPLETED_TASK = new TaskStatus('COMPLETED_TASK', 'Completed');

    return {
        ACTIVE_TASK,
        COMPLETED_TASK,
        getByCode(code) {
            if (code in this) {
                return this[code];
            } else {
                throw new Error("Task Code is not found");
            }
        }
    }
})();