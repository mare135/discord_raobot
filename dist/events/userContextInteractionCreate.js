import { Events } from 'discord.js';
import Event from '../base/Event.js';
export default new Event({
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isUserContextMenuCommand())
            return;
        try {
            const command = (await client.commands.get(interaction.commandName));
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
        }
    },
});
