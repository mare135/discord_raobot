import { Events } from 'discord.js';
import Event from '../base/Event.js';
export default new Event({
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (!client.commands.has(interaction.commandName))
            return;
        try {
            const command = (await client.commands.get(interaction.commandName));
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    },
});
