import { SlashCommandBuilder, userMention } from 'discord.js';
import MemberInfo from '../classes/MemberInfo.js';
import ApplicationCommand from '../templates/ApplicationCommand.js';

export default new ApplicationCommand({
  data: new SlashCommandBuilder()
    .setName('point')
    .setDescription('give player point')
    .addMentionableOption((option) =>
      option
        .setName('user')
        .setDescription('点数を付けるユーザーを選んでください。')
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName('point').setDescription('点数').setRequired(true)
    ),

  async execute(interaction): Promise<void> {
    const { memberInfos } = client;
    const { data } = interaction.options;
    if (!data) {
      await interaction.reply('no data error');
      return;
    }
    if (!data[0]?.value || !data[1]?.value) {
      await interaction.reply('no value error');
      return;
    }

    const targetId = data[0].value as string;
    const point = data[1].value as number;

    if (!memberInfos.has(targetId)) {
      memberInfos.set(targetId, new MemberInfo(targetId, point));
    } else {
      memberInfos.get(targetId)?.add(point);
    }
    await interaction.reply(
      `${userMention(targetId)} : ${point}ポイント獲得！（現在：${String(
        client.memberInfos.get(targetId)?.point
      )}ポイント）`
    );
  },
});
