export default class BaseButtonComponent {
    data;
    execute;
    constructor(object) {
        this.data = object.data;
        this.execute = object.execute;
    }
}
