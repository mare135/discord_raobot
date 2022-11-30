import { GuildMember, SlashCommandBuilder } from 'discord.js';
import GuildVoiceController from '../classes/GuildVoiceController.js';
import GoogleTranslateProvider, {
  GoogleTranslateLanguage,
} from '../classes/providers/GoogleTranslateTTSProvider.js';
import { VoiceManager } from '../classes/VoiceManager.js';
import ApplicationCommand from '../base/ApplicationCommand.js';

export default new ApplicationCommand({
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('ボットがVCに参加します'),

  async execute(interaction): Promise<void> {
    await interaction.deferReply();

    const voiceChannel = (interaction.member as GuildMember | null)?.voice
      .channel;

    if (!interaction.guild || !interaction.channel) {
      console.log('no guild error');
      return;
    }
    if (!voiceChannel) {
      await interaction.editReply({
        content: 'connection fail',
      });
      return;
    }

    try {
      const voice = new VoiceManager(interaction.guild);
      await voice.connect(voiceChannel);

      const guildVoiceController = new GuildVoiceController(
        interaction.guild.id,
        voiceChannel,
        interaction.channel,
        voice
      );

      await interaction.editReply({
        content: 'connection success',
      });

      const googlePayloads = await new GoogleTranslateProvider(
        'らおぼっとが参加しました！',
        { lang: GoogleTranslateLanguage.JAPANESE }
      ).createPayload();

      googlePayloads.forEach((payload) => {
        guildVoiceController.push(payload).catch((error) => console.log(error));
      });

      client.guildVoiceControllers.set(
        interaction.guild.id,
        guildVoiceController
      );
    } catch (error) {
      console.log(error);
      await interaction.editReply({
        content: 'unknown error',
      });
    }
  },
});
