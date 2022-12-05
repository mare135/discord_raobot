export default class ContextCommand {
    data;
    execute;
    constructor(object) {
        this.data = object.data;
        this.execute = object.execute;
    }
}
