import {
  GuildMember,
  ModalSubmitInteraction,
  TextBasedChannel,
  userMention,
  VoiceChannel,
} from 'discord.js';
import ModalComponent from '../../base/ModalComponent.js';
import { setTimeout } from 'node:timers/promises';

export default new ModalComponent({
  data: {
    name: 'user-limit-modal',
  },
  async execute(interaction: ModalSubmitInteraction) {
    try {
      const userLimit = Number(
        interaction.fields.getTextInputValue('user-limit-input')
      );

      if (!interaction.member) return;

      const member = interaction.member as GuildMember;
      const voiceChannel = member.voice.channel as VoiceChannel;

      if (!voiceChannel) {
        await interaction.reply('VCに参加してください。');
        return;
      }

      const oldUserLimit = voiceChannel.userLimit;
      await voiceChannel.setUserLimit(userLimit);

      const logChannel = client.channels.cache.get(
        '898098132519374868'
      ) as TextBasedChannel;

      if (!logChannel) {
        await interaction.reply('no log channel');
        return;
      }

      await logChannel.send({
        content: `${userMention(
          member.id
        )}人数制限変更：${oldUserLimit}→${userLimit}`,
      });
      await interaction.deferReply();
      await interaction.deleteReply();
    } catch (error) {
      console.log('問題発生');
      console.log(error);
      await interaction.reply({
        content: '問題が発生しました！',
      });
      await setTimeout(1000);
      await interaction.deleteReply();
    }
  },
});
