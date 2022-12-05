export default class BaseComponent {
    data;
    execute;
    constructor(object) {
        this.data = object.data;
        this.execute = object.execute;
    }
}
