import { Events } from 'discord.js';
import Event from '../base/Event.js';
export default new Event({
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton())
            return;
        try {
            const button = client.buttons.get(interaction.customId);
            if (!button)
                return;
            await button.execute(interaction);
        }
        catch (error) {
            console.error(error);
        }
    },
});
