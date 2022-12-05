import { getVoiceConnection } from '@discordjs/voice';
import { GuildMember, SlashCommandBuilder } from 'discord.js';
import ApplicationCommand from '../base/ApplicationCommand.js';

export default new ApplicationCommand({
  data: new SlashCommandBuilder()
    .setName('out')
    .setDescription('BOTをVCから落とす'),
  async execute(interaction): Promise<void> {
    const guildId = interaction.guildId;
    if (!guildId) return;

    const voiceChannel = (interaction.member as GuildMember | null)?.voice
      .channel;

    if (!voiceChannel) {
      await interaction.reply({
        content: 'VCに入ってからコマンドを入力してください',
      });
      return;
    }
    const connection = getVoiceConnection(guildId);

    if (!connection) {
      await interaction.reply({
        content: 'BOTが入ってません',
      });
      return;
    }

    // const guildVoiceController = client.guildVoiceControllers.get(guildId);

    // if (!guildVoiceController) {
    //   await interaction.reply({
    //     content: 'BOTが入ってません',
    //   });
    //   return;
    // }

    connection.destroy();
    client.guildVoiceControllers.delete(guildId);

    await interaction.reply({
      content: 'Bot disconnected',
    });
  },
});
