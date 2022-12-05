export default class BaseCommand {
    name;
    description;
    execute;
    constructor(object) {
        this.name = object.name;
        this.description = object.description;
        this.execute = object.execute;
    }
    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setExecute(executeFunction) {
        this.execute = executeFunction;
    }
}
