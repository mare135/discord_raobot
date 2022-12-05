export default class Event {
    name;
    once;
    execute;
    constructor(object) {
        this.name = object.name;
        this.once = object.once ?? false;
        this.execute = object.execute;
    }
}
