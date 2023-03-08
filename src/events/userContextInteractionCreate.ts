import { Events, UserContextMenuCommandInteraction } from 'discord.js';
import type ContextCommand from '../base/ContextCommand.js';
import Event from '../base/Event.js';

export default new Event({
  name: Events.InteractionCreate,
  async execute(interaction: UserContextMenuCommandInteraction): Promise<void> {
    // Dynamically handle slash commands
    if (!interaction.isUserContextMenuCommand()) return;

    try {
      const command: ContextCommand = (await client.commands.get(
        interaction.commandName
      )) as ContextCommand;

      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      // await interaction.reply({
      //   content: 'There was an error while executing this command!',
      //   ephemeral: true,
      // });
    }
  },
});
