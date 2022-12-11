import { BaseInteraction, Events, TextBasedChannel } from 'discord.js';
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

      const logChannel = client.channels.cache.get(
        '1051414468246110238'
      ) as TextBasedChannel;

      if (!logChannel) {
        console.log('ERROR NO LOG CHANNEL');
        return;
      }

      await logChannel.send({
        content: 'modal interaction error ',
      });
    }
  },
});
