import BaseCommand from './BaseCommand.js';
export default class MessageCommand extends BaseCommand {
    aliases;
    execute;
    constructor(options) {
        super(options);
        this.execute = options.execute;
        this.aliases = options.aliases ?? [];
    }
}
