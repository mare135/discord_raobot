export default class ApplicationCommand {
    data;
    hasSubCommands;
    execute;
    constructor(options) {
        this.execute = options.execute;
        this.data = options.data;
        this.hasSubCommands = options.hasSubCommands ?? false;
    }
}
