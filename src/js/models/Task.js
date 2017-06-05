import TaskStatusEnum from '../models/TaskStatusEnum';

export default class {
    constructor() {
        this.id;
        this.value;
        this.status; // Enum <TaskStatus.js>
        this.isChecked;
    }

    fromJSON(json) {
        this.id = json.id;
        this.value = json.value;
        this.status = TaskStatusEnum.getByCode(json.status);
        this.isChecked = Boolean(json.isChecked);

        return this;
    }

    toJSON() {
        return {
            id: this.id,
            value: this.value,
            status: this.status.code,
            isChecked: this.isChecked
        }
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }
};