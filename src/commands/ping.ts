import { SlashCommandBuilder } from 'discord.js';
import ApplicationCommand from '../base/ApplicationCommand.js';

export default new ApplicationCommand({
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies pong!'),
  async execute(interaction): Promise<void> {
    await interaction.reply('Pong!');
  },
});
