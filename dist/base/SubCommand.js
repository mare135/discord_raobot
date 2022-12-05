export default class SubCommand {
    execute;
    constructor(options) {
        this.execute = options.execute;
    }
    setExecute(executeFunction) {
        this.execute = executeFunction;
    }
}
