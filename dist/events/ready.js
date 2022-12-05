import { Events } from 'discord.js';
import Event from '../base/Event.js';
export default new Event({
    name: Events.ClientReady,
    once: true,
    execute() {
        console.log(`Logged in as ${client.user?.tag}!`);
    },
});
