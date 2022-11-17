import { BaseInteraction, Events } from 'discord.js';
import Event from '../base/Event.js';

export default new Event({
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction): Promise<void> {
    // Dynamically handle slash commands
    if (!interaction.isModalSubmit()) return;

    try {
      const modal = client.modals.get(interaction.customId);
      if (!modal) return;

      await modal.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'error on modalInteractionCreate',
        ephemeral: true,
      });
    }
  },
});
